const template = document.createElement("template");
template.innerHTML = `
  <style>
  h3 {
    font-size:20px;
  }
  img {
    border-radius: 50%;
  }

  .contact {
    width:480px;

    font-family: 'Arial', Sans-Serif;

    display:grid;
    grid-template-columns: 2fr 2fr;
    grid-gap:20px;

    background: #eef;
    border-bottom: steelblue 2px solid;
    margin-bottom:5px;

  }

  #toggle-info {
     background: steelblue;
     color:white;
     padding:3px;
     border-radius:3px;

  }

  </style>

  <div class='contact'>
    <img/>
    <div>
    <h3></h3>
    <div class='details'>
      <p><slot name='email' /></p>
      <p><slot name='phone' /></p>
    </div>
    <button id='toggle-info'>Hide</button>
    </div>

  </div>
  
`;

class KovaiContact extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    
    this.shadowRoot.querySelector('h3').innerHTML = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('pic');

  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const details = this.shadowRoot.querySelector('.details');
    const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

    if (this.showInfo) {
      details.style.display = 'block';
      toggleBtn.innerText = 'Hide';
    } else {
      toggleBtn.innerText = 'Show';
      details.style.display = 'none';
    }

  }

  connectedCallback() {
    this.shadowRoot.querySelector('#toggle-info')
      .addEventListener('click', () => {
         this.toggleInfo();
      });
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info')
      .removeEventListener('click');
     
   }

}

customElements.define("kovai-contact", KovaiContact);
