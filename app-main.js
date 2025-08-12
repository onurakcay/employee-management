/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import './src/components/index.js';

/**
 * Main application component demonstrating custom elements
 *
 * @fires form-submit - Dispatched when form is submitted
 */
export class AppMain extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        line-height: 1.6;
      }

      .header {
        text-align: center;
        margin-bottom: 40px;
        padding: 20px;
        background: linear-gradient(135deg, #e60026, #ff4757);
        color: white;
        border-radius: 8px;
      }

      .header h1 {
        margin: 0 0 10px 0;
        font-size: 2.5rem;
        font-weight: 700;
      }

      .header p {
        margin: 0;
        font-size: 1.1rem;
        opacity: 0.9;
      }

      .section {
        margin-bottom: 40px;
        padding: 20px;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        background-color: #fff;
      }

      .section h2 {
        margin: 0 0 20px 0;
        color: #e60026;
        font-size: 1.5rem;
        font-weight: 600;
        border-bottom: 2px solid #e60026;
        padding-bottom: 10px;
      }

      .button-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
        margin-bottom: 20px;
      }

      .form-example {
        max-width: 400px;
      }

      .form-row {
        margin-bottom: 20px;
      }

      .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .input-examples {
        display: grid;
        gap: 20px;
      }

      .demo-output {
        background-color: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        padding: 15px;
        margin-top: 20px;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 14px;
        white-space: pre-wrap;
      }

      .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }

      .feature-card {
        padding: 20px;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        background-color: #f8f9fa;
      }

      .feature-card h3 {
        margin: 0 0 10px 0;
        color: #e60026;
        font-size: 1.2rem;
      }

      .feature-card p {
        margin: 0;
        color: #666;
        font-size: 14px;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * Demo output text
       * @type {string}
       */
      demoOutput: {type: String, state: true},

      /**
       * Form data
       * @type {Object}
       */
      formData: {type: Object, state: true},
    };
  }

  constructor() {
    super();
    this.demoOutput = 'Component events will appear here...';
    this.formData = {
      name: '',
      email: '',
      country: '',
      newsletter: false,
      notifications: false,
      terms: false,
    };
  }

  render() {
    return html`
      <div class="header">
        <h1>🚀 Lit Element Custom Components</h1>
        <p>Modüler ve yeniden kullanılabilir web component'leri</p>
      </div>

      <!-- Button Examples -->
      <div class="section">
        <h2>🔘 Custom Button Component</h2>
        <div class="button-grid">
          <custom-button
            variant="primary"
            @button-click="${this._handleButtonClick}"
          >
            Primary Button
          </custom-button>
          <custom-button
            variant="secondary"
            @button-click="${this._handleButtonClick}"
          >
            Secondary
          </custom-button>
          <custom-button
            variant="outline"
            @button-click="${this._handleButtonClick}"
          >
            Outline
          </custom-button>
          <custom-button
            variant="success"
            @button-click="${this._handleButtonClick}"
          >
            Success
          </custom-button>
          <custom-button
            variant="danger"
            @button-click="${this._handleButtonClick}"
          >
            Danger
          </custom-button>
        </div>

        <div class="button-grid">
          <custom-button
            size="small"
            @button-click="${this._handleButtonClick}"
          >
            Small
          </custom-button>
          <custom-button
            size="large"
            @button-click="${this._handleButtonClick}"
          >
            Large Button
          </custom-button>
          <custom-button loading @button-click="${this._handleButtonClick}">
            Loading...
          </custom-button>
          <custom-button disabled @button-click="${this._handleButtonClick}">
            Disabled
          </custom-button>
        </div>

        <custom-button
          full-width
          variant="primary"
          @button-click="${this._handleButtonClick}"
        >
          Full Width Button
        </custom-button>
      </div>

      <!-- Input Examples -->
      <div class="section">
        <h2>📝 Custom Input Component</h2>
        <div class="input-examples">
          <custom-input
            label="İsim"
            placeholder="Adınızı girin"
            .value="${this.formData.name}"
            @input="${this._handleNameInput}"
            required
          ></custom-input>

          <custom-input
            label="E-posta"
            type="email"
            placeholder="email@example.com"
            .value="${this.formData.email}"
            @input="${this._handleEmailInput}"
            help-text="Geçerli bir e-posta adresi girin"
            required
          >
            <span slot="prefix">📧</span>
          </custom-input>

          <custom-input
            label="Şifre"
            type="password"
            placeholder="Güçlü bir şifre oluşturun"
            help-text="En az 8 karakter olmalı"
            size="large"
          >
            <span slot="suffix">🔒</span>
          </custom-input>

          <custom-input
            label="Telefon"
            type="tel"
            placeholder="+90 5XX XXX XX XX"
            size="small"
          >
            <span slot="prefix">📱</span>
          </custom-input>
        </div>
      </div>

      <!-- Checkbox Examples -->
      <div class="section">
        <h2>☑️ Custom Checkbox Component</h2>
        <div class="checkbox-group">
          <custom-checkbox
            .checked="${this.formData.newsletter}"
            @change="${this._handleNewsletterChange}"
          >
            <span slot="label">Newsletter aboneliği</span>
          </custom-checkbox>

          <custom-checkbox
            .checked="${this.formData.notifications}"
            @change="${this._handleNotificationsChange}"
            size="large"
          >
            <span slot="label">Bildirim almak istiyorum</span>
          </custom-checkbox>

          <custom-checkbox
            .checked="${this.formData.terms}"
            @change="${this._handleTermsChange}"
            required
          >
            <span slot="label"
              >Kullanım şartlarını kabul ediyorum
              <strong>(Gerekli)</strong></span
            >
          </custom-checkbox>

          <custom-checkbox disabled checked>
            <span slot="label">Devre dışı checkbox (işaretli)</span>
          </custom-checkbox>

          <custom-checkbox indeterminate size="small">
            <span slot="label">Belirsiz durum (indeterminate)</span>
          </custom-checkbox>
        </div>
      </div>

      <!-- Select Examples -->
      <div class="section">
        <h2>📋 Custom Select Component</h2>
        <div class="input-examples">
          <custom-select
            label="Ülke Seçin"
            placeholder="Ülkenizi seçin"
            .value="${this.formData.country}"
            @change="${this._handleCountryChange}"
            required
          >
            <option value="tr">Türkiye</option>
            <option value="us">Amerika Birleşik Devletleri</option>
            <option value="de">Almanya</option>
            <option value="fr">Fransa</option>
            <option value="nl">Hollanda</option>
            <option value="be">Belçika</option>
          </custom-select>

          <custom-select
            label="Favori Renk"
            size="small"
            help-text="En sevdiğiniz rengi seçin"
          >
            <option value="">Seçin</option>
            <option value="red">Kırmızı</option>
            <option value="blue">Mavi</option>
            <option value="green">Yeşil</option>
            <option value="yellow">Sarı</option>
          </custom-select>

          <custom-select label="Dil Tercihi" size="large" value="tr">
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="fr">Français</option>
          </custom-select>

          <custom-select
            label="Çoklu Seçim"
            multiple
            help-text="Birden fazla seçenek seçebilirsiniz"
          >
            <option value="option1">Seçenek 1</option>
            <option value="option2">Seçenek 2</option>
            <option value="option3">Seçenek 3</option>
            <option value="option4">Seçenek 4</option>
          </custom-select>
        </div>
      </div>

      <!-- Form Example -->
      <div class="section">
        <h2>📋 Form Örneği</h2>
        <div class="form-example">
          <form @submit="${this._handleSubmit}">
            <div class="form-row">
              <custom-input
                label="Ad Soyad"
                .value="${this.formData.name}"
                @input="${this._handleNameInput}"
                required
              ></custom-input>
            </div>

            <div class="form-row">
              <custom-input
                label="E-posta"
                type="email"
                .value="${this.formData.email}"
                @input="${this._handleEmailInput}"
                required
              ></custom-input>
            </div>

            <div class="form-row">
              <custom-select
                label="Ülke"
                .value="${this.formData.country}"
                @change="${this._handleCountryChange}"
                required
              >
                <option value="">Ülke seçin</option>
                <option value="tr">Türkiye</option>
                <option value="us">Amerika Birleşik Devletleri</option>
                <option value="de">Almanya</option>
                <option value="fr">Fransa</option>
                <option value="nl">Hollanda</option>
              </custom-select>
            </div>

            <div class="form-row">
              <custom-checkbox
                .checked="${this.formData.terms}"
                @change="${this._handleTermsChange}"
                required
              >
                <span slot="label">Kullanım şartlarını kabul ediyorum</span>
              </custom-checkbox>
            </div>

            <custom-button type="submit" variant="primary" full-width>
              Formu Gönder
            </custom-button>
          </form>
        </div>
      </div>

      <!-- Features -->
      <div class="section">
        <h2>✨ Özellikler</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>🎨 Özelleştirilebilir</h3>
            <p>CSS custom properties ile kolay tema değişikliği</p>
          </div>
          <div class="feature-card">
            <h3>📱 Responsive</h3>
            <p>Tüm cihaz boyutlarında mükemmel görünüm</p>
          </div>
          <div class="feature-card">
            <h3>♿ Erişilebilir</h3>
            <p>WAI-ARIA standartlarına uygun</p>
          </div>
          <div class="feature-card">
            <h3>🔧 Modüler</h3>
            <p>İhtiyaç duyduğunuz component'leri import edin</p>
          </div>
        </div>
      </div>

      <!-- Demo Output -->
      <div class="section">
        <h2>🔍 Event Monitor</h2>
        <div class="demo-output">${this.demoOutput}</div>
      </div>
    `;
  }

  _handleButtonClick(event) {
    const button = event.target;
    const variant = button.getAttribute('variant') || 'default';
    const text = button.textContent.trim();

    this.demoOutput = `Button clicked!
Component: custom-button
Variant: ${variant}
Text: ${text}
Timestamp: ${new Date().toLocaleTimeString()}`;
  }

  _handleNameInput(event) {
    this.formData = {
      ...this.formData,
      name: event.detail.value,
    };

    this.demoOutput = `Name input changed: "${event.detail.value}"`;
  }

  _handleEmailInput(event) {
    this.formData = {
      ...this.formData,
      email: event.detail.value,
    };

    this.demoOutput = `Email input changed: "${event.detail.value}"`;
  }

  _handleCountryChange(event) {
    this.formData = {
      ...this.formData,
      country: event.detail.value,
    };

    this.demoOutput = `Country selected: "${event.detail.value}"`;
  }

  _handleNewsletterChange(event) {
    this.formData = {
      ...this.formData,
      newsletter: event.detail.checked,
    };

    this.demoOutput = `Newsletter checkbox: ${
      event.detail.checked ? 'checked' : 'unchecked'
    }`;
  }

  _handleNotificationsChange(event) {
    this.formData = {
      ...this.formData,
      notifications: event.detail.checked,
    };

    this.demoOutput = `Notifications checkbox: ${
      event.detail.checked ? 'checked' : 'unchecked'
    }`;
  }

  _handleTermsChange(event) {
    this.formData = {
      ...this.formData,
      terms: event.detail.checked,
    };

    this.demoOutput = `Terms checkbox: ${
      event.detail.checked ? 'checked' : 'unchecked'
    }`;
  }

  _handleSubmit(event) {
    event.preventDefault();

    if (
      !this.formData.name ||
      !this.formData.email ||
      !this.formData.country ||
      !this.formData.terms
    ) {
      this.demoOutput = `Form validation failed!
Missing required fields:
- Name: ${this.formData.name ? '✓' : '✗'}
- Email: ${this.formData.email ? '✓' : '✗'}
- Country: ${this.formData.country ? '✓' : '✗'}
- Terms: ${this.formData.terms ? '✓' : '✗'}`;
      return;
    }

    this.demoOutput = `Form submitted successfully! 🎉
Data: ${JSON.stringify(this.formData, null, 2)}`;

    this.dispatchEvent(
      new CustomEvent('form-submit', {
        detail: this.formData,
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('app-main', AppMain);
