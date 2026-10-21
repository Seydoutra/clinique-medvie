(() => {
  const card = document.getElementById('medvitaleCard');
  card?.addEventListener('click', () => {
    const flipped = card.classList.toggle('flipped');
    card.setAttribute('aria-pressed', String(flipped));
  });

  const content = [
    { number:'01', kicker:'Votre point de départ', title:'Un bilan adapté à vos besoins.', text:'Commencez par un bilan complet ou partiel à Clinique Medvie. L’équipe vous oriente vers les examens pertinents selon votre situation.', label:'Découvrir les bilans', href:'laboratoire.html', icon:'＋' },
    { number:'02', kicker:'Votre identifiant santé', title:'Une carte liée à votre parcours.', text:'Après votre bilan, la carte Medvitale devient le point d’accès simple à votre environnement de santé numérique.', label:'Voir la carte', href:'#obtenir', icon:'◇' },
    { number:'03', kicker:'Votre espace numérique', title:'Votre dossier accessible par vous.', text:'Consultez les éléments disponibles de votre dossier depuis votre espace, sans multiplier les papiers et les déplacements.', label:'Ouvrir la démo patient', href:'patient.html', icon:'▤' },
    { number:'04', kicker:'Votre consentement', title:'Le partage commence par votre accord.', text:'Vous effectuez les validations nécessaires avant qu’un médecin puisse consulter les informations utiles de votre dossier.', label:'Simuler l’autorisation', href:'#autorisation', icon:'✓' }
  ];
  const tabs = [...document.querySelectorAll('.mv-steps button')];
  const panel = document.getElementById('mv-step-panel');
  const fields = {
    number: panel?.querySelector('.mv-panel-number'), kicker: document.getElementById('mv-panel-kicker'),
    title: document.getElementById('mv-panel-title'), text: document.getElementById('mv-panel-text'),
    link: document.getElementById('mv-panel-link'), icon: document.getElementById('mv-panel-icon')
  };
  tabs.forEach(tab => tab.addEventListener('click', () => {
    const item = content[Number(tab.dataset.step)];
    tabs.forEach(t => { t.classList.toggle('active', t === tab); t.setAttribute('aria-selected', String(t === tab)); });
    panel?.animate([{opacity:.3,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:320,easing:'ease-out'});
    fields.number.textContent = item.number; fields.kicker.textContent = item.kicker; fields.title.textContent = item.title;
    fields.text.textContent = item.text; fields.link.innerHTML = `${item.label} <span>→</span>`; fields.link.href = item.href; fields.icon.textContent = item.icon;
  }));

  const authorize = document.getElementById('authorizeDemo');
  authorize?.addEventListener('click', () => {
    authorize.classList.toggle('authorized');
    const active = authorize.classList.contains('authorized');
    authorize.querySelector('b').textContent = active ? 'Accès autorisé' : 'Autoriser l’accès';
    authorize.querySelector('small').textContent = active ? 'Démo : le médecin peut consulter' : 'Démonstration interactive';
  });

  const planButtons = [...document.querySelectorAll('[data-plan]')];
  planButtons.forEach(button => button.addEventListener('click', () => {
    planButtons.forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-checked', String(b === button)); });
    document.getElementById('selectedPlan').textContent = button.dataset.plan;
  }));

  const toast = document.querySelector('.mv-toast');
  document.getElementById('requestCard')?.addEventListener('click', () => {
    const plan = document.getElementById('selectedPlan').textContent;
    toast.textContent = `${plan} sélectionné — redirection vers la prise de rendez-vous…`;
    toast.classList.add('show');
    setTimeout(() => { window.location.href = 'index.html#contact'; }, 1200);
  });
})();
