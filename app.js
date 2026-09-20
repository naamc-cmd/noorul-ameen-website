(function(){
  const DEMO_BUYER={email:'buyer@delhioz.com',password:'pass123'};
  const DEMO_ADMIN={email:'admin@noorulameen.com',password:'admin123'};
  const $=s=>document.querySelector(s);
  function msg(id,text,ok=false){const e=$(id);if(!e)return;e.textContent=text;e.className='auth-message '+(ok?'success':'error');}
  function switchView(id){const el=document.getElementById(id); if(el) el.checked=true; window.scrollTo({top:0,behavior:'smooth'});}
  function init(){
    const buyerForm=$('#buyer-login-form');
    if(buyerForm) buyerForm.addEventListener('submit',e=>{
      e.preventDefault(); const email=$('#buyer-email').value.trim().toLowerCase(); const pass=$('#buyer-password').value;
      if(email===DEMO_BUYER.email && pass===DEMO_BUYER.password){ localStorage.setItem('buyerSession','1'); showBuyer(true); msg('#buyer-auth-message','Login successful.',true); }
      else msg('#buyer-auth-message','Invalid buyer email or password. Contact the administrator for an account.');
    });
    const adminForm=$('#admin-login-form');
    if(adminForm) adminForm.addEventListener('submit',e=>{
      e.preventDefault(); const email=$('#admin-email').value.trim().toLowerCase(); const pass=$('#admin-password').value;
      if(email===DEMO_ADMIN.email && pass===DEMO_ADMIN.password){ localStorage.setItem('adminSession','1'); showAdmin(true); msg('#admin-auth-message','Admin login successful.',true); }
      else msg('#admin-auth-message','Invalid administrator email or password.');
    });
    $('#buyer-logout')?.addEventListener('click',()=>{localStorage.removeItem('buyerSession');showBuyer(false);});
    $('#admin-logout')?.addEventListener('click',()=>{localStorage.removeItem('adminSession');showAdmin(false);});
    $('#demo-buyer-fill')?.addEventListener('click',()=>{ $('#buyer-email').value=DEMO_BUYER.email; $('#buyer-password').value=DEMO_BUYER.password; });
    $('#demo-admin-fill')?.addEventListener('click',()=>{ $('#admin-email').value=DEMO_ADMIN.email; $('#admin-password').value=DEMO_ADMIN.password; });
    document.querySelectorAll('[data-switch]').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.switch)));
    showBuyer(localStorage.getItem('buyerSession')==='1'); showAdmin(localStorage.getItem('adminSession')==='1');
  }
  function showBuyer(logged){ $('.buyer-login-wrap')?.classList.toggle('hidden',logged); $('.buyer-dashboard')?.classList.toggle('hidden',!logged); }
  function showAdmin(logged){ $('.admin-login-wrap')?.classList.toggle('hidden',logged); $('.admin-dashboard')?.classList.toggle('hidden',!logged); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
