(function(){
    // utilities
    function formatMoney(n){ return 'S/ '+(Number(n)||0).toFixed(2); }
    function readItems(){ try{ return JSON.parse(localStorage.getItem('cartItems'))||[] }catch(e){ return [] } }
    function saveItems(items){ localStorage.setItem('cartItems', JSON.stringify(items)); localStorage.setItem('cartCount', String(items.reduce((s,i)=> s + (i.qty||1),0))); renderMiniCart(); }

    // Mini-cart render and toggle
    function renderMiniCart(){
        const mc = document.getElementById('mini-cart');
        const mcItems = document.getElementById('mc-items');
        const mcCount = document.getElementById('mc-count');
        const mcTotal = document.getElementById('mc-total');
        if(!mcItems || !mcCount || !mcTotal) return;
        const items = readItems();
        const count = items.reduce((s,i)=> s + (i.qty||1),0);
        const total = items.reduce((s,i)=> s + ((i.price||0)*(i.qty||1)),0);
        mcCount.textContent = count;
        mcTotal.textContent = formatMoney(total);
        const cartCountEl = document.getElementById('cart-count'); if(cartCountEl) cartCountEl.textContent = count;
        // update header total display if present
        const headerTotalEl = document.getElementById('cart-total'); if(headerTotalEl) headerTotalEl.textContent = formatMoney(total);
        mcItems.innerHTML = '';
        if(items.length===0){ mcItems.innerHTML = '<div class="mc-empty">Tu carrito está vacío</div>'; return; }
        items.forEach(i=>{
            const div = document.createElement('div');
            div.className = 'mc-item';
            div.innerHTML = `<img src="${i.img||'https://via.placeholder.com/48'}" alt=""><div style="flex:1"><div style=\"font-weight:600\">${i.title}</div><div style=\"color:#666\">${i.qty} × ${formatMoney(i.price)}</div></div><div style=\"font-weight:600\">${formatMoney((i.price||0)*(i.qty||1))}</div>`;
            mcItems.appendChild(div);
        });
    }

    // toggle mobile nav
    function initMenuToggle(){
        const toggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav-links');
        if(toggle && nav){
            toggle.addEventListener('click', ()=> nav.style.display = (nav.style.display==='flex' ? 'none' : 'flex'));
            nav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=>{ if(window.innerWidth<=880) nav.style.display='none'; }));
        }
    }

    // mini-cart toggle
    function initMiniCartToggle(){
        const cartAnchor = document.querySelector('.cart');
        const mc = document.getElementById('mini-cart');
        if(cartAnchor && mc){
            cartAnchor.addEventListener('click', function(e){ e.preventDefault(); mc.style.display = (mc.style.display==='block' ? 'none' : 'block'); mc.setAttribute('aria-hidden', mc.style.display!=='block'); });
            document.addEventListener('click', function(e){ if(mc.style.display==='block' && !mc.contains(e.target) && !cartAnchor.contains(e.target)) mc.style.display='none'; });
        }
        // if header uses .cart-info instead of .cart anchor (we removed the icon), attach there too
        const cartInfo = document.getElementById('cart-info');
        if(cartInfo && mc && !cartAnchor){
            cartInfo.addEventListener('click', function(e){ e.preventDefault(); mc.style.display = (mc.style.display==='block' ? 'none' : 'block'); mc.setAttribute('aria-hidden', mc.style.display!=='block'); });
            document.addEventListener('click', function(e){ if(mc.style.display==='block' && !mc.contains(e.target) && !cartInfo.contains(e.target)) mc.style.display='none'; });
        }
    }

    // add to cart (delegated)
    function initAddToCartButtons(){
        document.addEventListener('click', function(e){
            const btn = e.target.closest && e.target.closest('.add-to-cart');
            if(!btn) return;
            const id = btn.dataset.id || (new Date().getTime().toString());
            const title = btn.dataset.title || btn.dataset.name || 'Producto';
            const price = parseFloat(btn.dataset.price) || 0;
            const img = btn.dataset.img || '';
            const qty = parseInt(btn.dataset.qty) || 1;
            let items = readItems();
            const exists = items.find(i=> i.id===id || i.title===title);
            if(exists){ exists.qty = (exists.qty||1) + qty; }
            else { items.push({ id, title, price, qty, img }); }
            saveItems(items);
            // feedback
            const original = btn.textContent;
            btn.textContent = '✓ Añadido';
            setTimeout(()=> btn.textContent = original,1200);
        });
    }

    // product page: load product by ?id=...
    function initProductPage(){
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if(!id) return;
        // build a small client-side catalog map (could be replaced by API)
        const catalog = {
            'p1': { title:'Indomie Noodles', price:26.90, img:'https://static-01.daraz.com.np/p/cafc6ea6be0ec218ac31e51b2d7d2bff.jpg', desc:'Sabor clásico instantáneo.'},
            'p2': { title:'Nestle Water', price:26.32, img:'https://images-cdn.ubuy.com.sa/635a0d9bf8f5cc4bb05a40d3-nestle-pure-life-pure-pak.jpg', desc:'Agua pura en envase práctico.'},
            'p3': { title:'Cadbury Chocolate', price:5.00, img:'https://www.cadbury.co.za/media/3163/dmplain.jpg', desc:'Chocolate delicioso.'},
            'p4': { title:'Filtro de Aire', price:20.00, img:'https://http2.mlstatic.com/D_NQ_NP_698457-MLM44163794040_112020-O.webp', desc:'Filtro de aire premium.'},
            'p5': { title:'Filtro Aire Camry', price:22.00, img:'https://via.placeholder.com/400x300?text=Filtro+Camry', desc:'Filtro compatible Camry.'},
            'p6': { title:'Filtro Hyundai', price:25.00, img:'https://via.placeholder.com/400x300?text=Filtro+Hyundai', desc:'Filtro Hyundai OEM.'},
            'p7': { title:'Filtro Nissan', price:24.00, img:'https://via.placeholder.com/400x300?text=Filtro+Nissan', desc:'Filtro Nissan original.'},
            'p8': { title:'Filtro Chevrolet', price:26.00, img:'https://via.placeholder.com/400x300?text=Filtro+Chevrolet', desc:'Filtro Chevrolet Captiva.'},
            'p9': { title:'Filtro Toyota', price:20.50, img:'https://via.placeholder.com/400x300?text=Filtro+Toyota', desc:'Filtro Toyota premium.'},
            'p10': { title:'Filtro Mazda', price:23.90, img:'https://via.placeholder.com/400x300?text=Filtro+Mazda', desc:'Filtro Mazda 3.'},
            'p11': { title:'Filtro Ford', price:21.50, img:'https://via.placeholder.com/400x300?text=Filtro+Ford', desc:'Filtro Ford compatible.'},
            'p12': { title:'Filtro Suzuki', price:19.90, img:'https://via.placeholder.com/400x300?text=Filtro+Suzuki', desc:'Filtro Suzuki APV.'}
        };
        const data = catalog[id];
        if(!data) return;
        // populate page
        const titleEl = document.querySelector('.product-info h1');
        const priceBoxNew = document.querySelector('.product-info .new-price');
        const mainImg = document.querySelector('.gallery .main-img');
        const descEl = document.querySelector('.product-info .description');
        if(titleEl) titleEl.textContent = data.title;
        if(priceBoxNew) priceBoxNew.textContent = 'S/ '+Number(data.price).toFixed(2);
        if(mainImg) mainImg.src = data.img; if(mainImg) mainImg.alt = data.title;
        if(descEl) descEl.textContent = data.desc;
        // set buy button attributes
        const buyBtn = document.getElementById('buy-btn');
        const qtyInput = document.getElementById('product-qty');
        if(buyBtn){
            buyBtn.dataset.id = id; buyBtn.dataset.title = data.title; buyBtn.dataset.price = data.price; buyBtn.dataset.img = data.img;
        }
        if(qtyInput) qtyInput.value = 1;
    }

    // product card clicks: clicking a card (not on links/buttons) adds item to cart
    function initProductCardClicks(){
        document.addEventListener('click', function(e){
            const card = e.target.closest && e.target.closest('.product-card');
            if(!card) return;
            // ignore clicks on links or on the add button
            if(e.target.closest('a') || e.target.closest('.add-to-cart')) return;
            const id = card.dataset.id;
            if(!id) return;
            const title = card.dataset.title || (card.querySelector('.product-title') && card.querySelector('.product-title').textContent.trim()) || 'Producto';
            const price = parseFloat(card.dataset.price) || 0;
            const img = card.dataset.img || (card.querySelector('img') && card.querySelector('img').src) || '';
            let items = readItems();
            const exists = items.find(i=> i.id===id);
            if(exists){ exists.qty = (exists.qty||1) + 1; }
            else { items.push({ id, title, price, qty: 1, img }); }
            saveItems(items);
            // visual feedback
            try{
                card.style.transition = 'transform .12s';
                card.style.transform = 'scale(0.99)';
                setTimeout(()=> card.style.transform = '',140);
                const btn = card.querySelector('.add-to-cart');
                if(btn){ const orig = btn.textContent; btn.textContent = '✓ Añadido'; setTimeout(()=> btn.textContent = orig,1200); }
            }catch(e){}
        });
    }

    // shopping-cart page render (full page)
    function renderShoppingCartPage(){
        const container = document.getElementById('cart-items-container');
        const subtotalEl = document.getElementById('summary-subtotal');
        const shippingEl = document.getElementById('summary-shipping');
        const totalEl = document.getElementById('summary-total');
        const checkoutBtn = document.getElementById('checkout-btn');
        if(!container) return;
        const items = readItems();
        container.innerHTML = '';
        if(items.length===0){ container.innerHTML = '<p>Tu carrito está vacío.</p>'; if(subtotalEl) subtotalEl.textContent = formatMoney(0); if(totalEl) totalEl.textContent = formatMoney(0); if(checkoutBtn) checkoutBtn.classList.add('disabled'); return; }
        if(checkoutBtn) checkoutBtn.classList.remove('disabled');
        let subtotal = 0;
        items.forEach((it, idx)=>{
            const row = document.createElement('div');
            row.className = 'cart-item';
            row.innerHTML = `
                <img src="${it.img||'https://via.placeholder.com/140x90'}" alt="${it.title}">
                <div class="info">
                    <div class="title">${it.title}</div>
                    <div class="meta">P. Unitario <span class="price">${formatMoney(it.price)}</span></div>
                    <div class="qty">Cantidad: <button class="qty-decrease" data-idx="${idx}">−</button><input type="number" min="1" value="${it.qty||1}" data-idx="${idx}" class="cart-qty-input"><button class="qty-increase" data-idx="${idx}">+</button></div>
                </div>
                <div style="text-align:right"><div class="price">${formatMoney((it.price||0)*(it.qty||1))}</div><button class="remove-btn" data-idx="${idx}" style="margin-top:12px;background:transparent;border:none;color:#e3342f;cursor:pointer">🗑️</button></div>
            `;
            container.appendChild(row);
            subtotal += (it.price||0)*(it.qty||1);
        });
        if(subtotalEl) subtotalEl.textContent = formatMoney(subtotal);
        const shipping = parseFloat((shippingEl ? shippingEl.textContent.replace(/[^0-9.,]/g,'') : '10').replace(',','.')) || 0;
        if(totalEl) totalEl.textContent = formatMoney(subtotal + shipping);

        // attach handlers for qty inputs and buttons
        container.querySelectorAll('.cart-qty-input').forEach(inp=>{
            inp.addEventListener('change', function(){
                const i = parseInt(this.dataset.idx);
                const val = parseInt(this.value) || 1;
                const items = readItems();
                if(items[i]){ items[i].qty = val; saveItems(items); renderShoppingCartPage(); }
            });
        });
        container.querySelectorAll('.qty-decrease').forEach(btn=> btn.addEventListener('click', function(){
            const i = parseInt(this.dataset.idx);
            const items = readItems(); if(!items[i]) return; items[i].qty = Math.max(1,(items[i].qty||1)-1); saveItems(items); renderShoppingCartPage();
        }));
        container.querySelectorAll('.qty-increase').forEach(btn=> btn.addEventListener('click', function(){
            const i = parseInt(this.dataset.idx);
            const items = readItems(); if(!items[i]) return; items[i].qty = (items[i].qty||1)+1; saveItems(items); renderShoppingCartPage();
        }));
        container.querySelectorAll('.remove-btn').forEach(btn=> btn.addEventListener('click', function(){
            const i = parseInt(this.dataset.idx);
            let items = readItems();
            items = items.filter((_,j)=> j!==i);
            saveItems(items); renderShoppingCartPage();
        }));
    }

    // init common
    document.addEventListener('DOMContentLoaded', function(){
        initMenuToggle();
        initMiniCartToggle();
        initAddToCartButtons();
        initProductCardClicks();
        renderMiniCart();
        // page specific
        initProductPage();
        renderShoppingCartPage();
    });

    // expose for debugging
    window.__renderMiniCart = renderMiniCart;
    window.__renderShoppingCartPage = renderShoppingCartPage;
})();