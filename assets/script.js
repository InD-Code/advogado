// Configurações editáveis
const CONFIG = {
  whatsappNumber: null, // sobrescrito pelo data-whatsapp do formulário
  recipients: null,     // sobrescrito pelo data-recipients do formulário (separados por ; ou ,)
  jitsiRoom: 'AlmeidaPimentelAtendimento',
  jitsiDomain: 'meet.jit.si',
  importantNotices: [
    // Preencha para exibir o quadro flutuante
    // { title: 'Recesso forense', body: 'Atendimento remoto de 20/12 a 06/01.' }
  ],
  noticeStorageKey: 'ap_notice_last_show'
};

// Helpers
const qs = (sel, el=document) => el.querySelector(sel);

// WhatsApp flutuante
(function initWhatsFloat(){
  const btn = qs('#whatsFloat');
  const form = qs('#contactForm');
  const number = form?.dataset.whatsapp || CONFIG.whatsappNumber;
  if(!number){
    btn.style.display='none';
    return;
  }
  btn.href = `https://wa.me/${number}`;
})();

// Formulário de contato: envio para ambos (mailto + WhatsApp opcional)
(function initContact(){
  const form = qs('#contactForm');
  if(!form) return;
  const recipientsRaw = form.dataset.recipients || '';
  const recipients = recipientsRaw.split(/[;,\s]+/).filter(Boolean);
  CONFIG.recipients = recipients;
  CONFIG.whatsappNumber = form.dataset.whatsapp || CONFIG.whatsappNumber;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const subject = encodeURIComponent(data.assunto || 'Contato via site');
    const body = encodeURIComponent(
      `Nome: ${data.nome}\nE-mail: ${data.email}\nTelefone: ${data.telefone || ''}\n\nMensagem:\n${data.mensagem}`
    );

    if(recipients.length){
      const mailto = `mailto:${recipients.join(',')}?subject=${subject}&body=${body}`;
      window.location.href = mailto;
    }else{
      alert('Destinatários não configurados. Informe os e-mails em data-recipients.');
    }
  });

  const sendWhats = qs('#sendWhats');
  sendWhats?.addEventListener('click', ()=>{
    const data = Object.fromEntries(new FormData(form).entries());
    if(!CONFIG.whatsappNumber){
      alert('WhatsApp não configurado. Informe o número em data-whatsapp.');
      return;
    }
    const text = encodeURIComponent(`Olá!\nAssunto: ${data.assunto}\n${data.mensagem}\n— ${data.nome} (${data.email} ${data.telefone||''})`);
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${text}`, '_blank');
  });
})();

// Aviso flutuante (modal)
(function initNotice(){
  const notices = CONFIG.importantNotices;
  if(!notices || !notices.length) return;
  const last = localStorage.getItem(CONFIG.noticeStorageKey);
  const today = new Date().toDateString();
  if(last === today) return; // já exibido hoje

  const m = qs('#noticeModal');
  const body = qs('#noticeBody', m);
  const titleEl = qs('#noticeTitle', m);
  const {title, body:html} = notices[0];
  titleEl.textContent = title || 'Comunicado importante';
  body.innerHTML = html || '';
  m.setAttribute('aria-hidden','false');
  localStorage.setItem(CONFIG.noticeStorageKey, today);

  m.addEventListener('click', (e)=>{
    if(e.target.matches('[data-close]') || e.target === qs('.modal-backdrop', m)){
      m.setAttribute('aria-hidden','true');
    }
  });
})();

// Videochamada via Jitsi
(function initVideo(){
  const btn = qs('#btnVideo');
  const modal = qs('#videoModal');
  const backdrop = qs('#videoModal .modal-backdrop');
  const close = qs('#videoModal .modal-close');
  btn?.addEventListener('click', ()=>{
    modal.setAttribute('aria-hidden','false');
    // Embed Jitsi
    const domain = CONFIG.jitsiDomain;
    const options = {
      roomName: CONFIG.jitsiRoom,
      parentNode: qs('#jitsi'),
      userInfo: {},
      configOverwrite: {
        prejoinPageEnabled: true
      },
      interfaceConfigOverwrite: {
        MOBILE_APP_PROMO:true
      }
    };
    // eslint-disable-next-line no-undef
    window.jitsiApi = new JitsiMeetExternalAPI(domain, options);
  });
  const closeModal = ()=>{
    modal.setAttribute('aria-hidden','true');
    if(window.jitsiApi){
      try{ window.jitsiApi.dispose(); }catch{}
    }
    qs('#jitsi').innerHTML='';
  };
  backdrop?.addEventListener('click', closeModal);
  close?.addEventListener('click', closeModal);
})();
