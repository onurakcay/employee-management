/**
 * @license
 * Copyright 2025 ING Hubs
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * Localization utility for ING Hubs Employee Management System
 * Supports Turkish (tr) and English (en) languages
 */

// Translation dictionaries
const translations = {
  tr: {
    // Common
    cancel: 'İptal',
    save: 'Kaydet',
    save_employee: 'Çalışanı Kaydet',
    edit: 'Düzenle',
    delete: 'Sil',
    add: 'Ekle',
    search: 'Ara',
    loading: 'Yükleniyor...',
    error: 'Hata',
    success: 'Başarılı',
    warning: 'Uyarı',
    info: 'Bilgi',
    confirm: 'Onayla',
    close: 'Kapat',
    back: 'Geri',
    next: 'İleri',
    previous: 'Önceki',
    yes: 'Evet',
    no: 'Hayır',
    selected: 'seçildi',
    export_selected: 'Seçilenleri Dışa Aktar',
    delete_selected: 'Seçilenleri Sil',

    // Navigation
    home: 'Ana Sayfa',
    employees: 'Çalışanlar',
    employee_list: 'Çalışan Listesi',
    add_employee: 'Çalışan Ekle',
    edit_employee: 'Çalışanı Düzenle',
    employee_management: 'Çalışan Yönetimi',
    dashboard: 'Panel',

    // Employee List
    employee_list_title: 'Çalışan Listesi',
    search_employees: 'Çalışanları ara...',
    add_new_employee: 'Yeni Çalışan Ekle',
    list_view: 'Liste Görünümü',
    card_view: 'Kart Görünümü',
    total_employees: 'Toplam Çalışan',
    active_employees: 'Aktif Çalışan',
    no_employees_found: 'Çalışan bulunamadı',
    showing_results: 'sonuç gösteriliyor',
    of: ' / ',

    // Employee Table Headers
    employee_id: 'Çalışan ID',
    first_name: 'Ad',
    last_name: 'Soyad',
    email: 'E-posta',
    department: 'Departman',
    position: 'Pozisyon',
    hire_date: 'İşe Başlama Tarihi',
    date_of_birth: 'Doğum Tarihi',
    salary: 'Maaş',
    status: 'Durum',
    actions: 'İşlemler',

    // Employee Status
    active: 'Aktif',
    inactive: 'Pasif',
    pending: 'Beklemede',

    // Add Employee Form
    add_employee_title: 'Yeni Çalışan Ekle',
    edit_employee_title: 'Çalışanı Düzenle',
    update_employee: 'Çalışanı Güncelle',
    editing_employee_info: 'Düzenlenmekte olan çalışan:',
    employee_not_found: 'Çalışan Bulunamadı',
    employee_not_found_message: 'Düzenlemek istediğiniz çalışan bulunamadı.',
    back_to_list: 'Listeye Geri Dön',
    employee_information: 'Çalışan Bilgileri',
    personal_info: 'Kişisel Bilgiler',
    contact_info: 'İletişim Bilgileri',
    employment_info: 'İş Bilgileri',
    first_name_label: 'Ad',
    last_name_label: 'Soyad',
    email_label: 'E-posta Adresi',
    phone_label: 'Telefon',
    department_label: 'Departman',
    position_label: 'Pozisyon',
    hire_date_label: 'İşe Başlama Tarihi',
    salary_label: 'Maaş',
    status_label: 'Durum',

    // Form Placeholders
    enter_first_name: 'Adınızı girin',
    enter_last_name: 'Soyadınızı girin',
    enter_email: 'E-posta adresinizi girin',
    enter_phone: 'Telefon numaranızı girin',
    select_department: 'Departman seçin',
    enter_position: 'Pozisyonu girin',
    select_date: 'Tarih seçin',
    enter_salary: 'Maaş miktarını girin',
    select_status: 'Durum seçin',

    // Job Levels
    junior: 'Junior',
    mid_level: 'Orta Seviye',
    senior: 'Senior',
    lead: 'Lead',
    manager: 'Yönetici',
    director: 'Direktör',

    // Departments
    engineering: 'Mühendislik',
    marketing: 'Pazarlama',
    sales: 'Satış',
    hr: 'İnsan Kaynakları',
    finance: 'Finans',
    operations: 'Operasyonlar',
    it: 'Bilgi İşlem',
    design: 'Tasarım',

    // Validation Messages
    required_field: 'Bu alan zorunludur',
    invalid_email: 'Geçerli bir e-posta adresi girin',
    invalid_phone: 'Geçerli bir telefon numarası girin',
    salary_min: 'Maaş en az 0 olmalıdır',
    date_birth_before_employment:
      'Doğum tarihi işe başlama tarihinden önce olmalıdır',
    employee_min_age: 'Çalışan en az 18 yaşında olmalıdır',

    // Form placeholders and selects
    select_position: 'Pozisyon Seçin',

    // Position options
    junior_developer: 'Junior Developer',
    senior_developer: 'Senior Developer',
    product_manager: 'Product Manager',
    ux_designer: 'UX Designer',
    data_analyst: 'Data Analyst',

    // Confirmation messages
    unsaved_changes_warning:
      'Kaydedilmemiş değişiklikleriniz var. İptal etmek istediğinizden emin misiniz?',
    delete_employee_title: 'Emin misiniz?',
    delete_employee_message: 'Seçilen çalışan kaydı',
    will_be_deleted: 'silinecektir',
    delete_selected_employees_title: 'Seçili Çalışanları Sil',
    delete_selected_employees_message: 'Aşağıdaki çalışanlar silinecektir:',
    delete_all: 'Hepsini Sil',
    bulk_delete_warning: 'Bu işlem geri alınamaz!',
    proceed: 'Devam Et',
    delete_confirmation:
      'Bu işlem geri alınamaz. Devam etmek istediğinizden emin misiniz?',

    // Success Messages
    employee_added: 'Çalışan başarıyla eklendi',
    employee_updated: 'Çalışan başarıyla güncellendi',
    employee_deleted: 'Çalışan başarıyla silindi',

    // Error Messages
    employee_add_error: 'Çalışan eklenirken hata oluştu',
    employee_update_error: 'Çalışan güncellenirken hata oluştu',
    employee_delete_error: 'Çalışan silinirken hata oluştu',
    network_error: 'Ağ bağlantısı hatası',
    server_error: 'Sunucu hatası',

    // Pagination
    page: 'Sayfa',
    per_page: 'Sayfa başına',
    first_page: 'İlk sayfa',
    last_page: 'Son sayfa',
    rows_per_page: 'Satır/sayfa',

    // User Info
    welcome: 'Hoş geldiniz',
    profile: 'Profil',
    settings: 'Ayarlar',
    logout: 'Çıkış',
    change_language: 'Dili Değiştir',

    // 404 Page
    page_not_found: 'Sayfa Bulunamadı',
    page_not_found_description:
      'Aradığınız sayfa mevcut değil veya taşınmış olabilir.',
    go_home: 'Ana Sayfaya Dön',

    // Date Format
    date_format: 'DD.MM.YYYY',
    currency_symbol: '₺',
  },

  en: {
    // Common
    cancel: 'Cancel',
    save: 'Save',
    save_employee: 'Save Employee',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    search: 'Search',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
    confirm: 'Confirm',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    yes: 'Yes',
    no: 'No',
    selected: 'selected',
    export_selected: 'Export Selected',
    delete_selected: 'Delete Selected',

    // Navigation
    home: 'Home',
    employees: 'Employees',
    employee_list: 'Employee List',
    add_employee: 'Add Employee',
    edit_employee: 'Edit Employee',
    employee_management: 'Employee Management',
    dashboard: 'Dashboard',

    // Employee List
    employee_list_title: 'Employee List',
    search_employees: 'Search employees...',
    add_new_employee: 'Add New Employee',
    list_view: 'List View',
    card_view: 'Card View',
    total_employees: 'Total Employees',
    active_employees: 'Active Employees',
    no_employees_found: 'No employees found',
    showing_results: 'showing results',
    of: ' of ',

    // Employee Table Headers
    employee_id: 'Employee ID',
    first_name: 'First Name',
    last_name: 'Last Name',
    email: 'Email',
    department: 'Department',
    position: 'Position',
    hire_date: 'Hire Date',
    date_of_birth: 'Date of Birth',
    salary: 'Salary',
    status: 'Status',
    actions: 'Actions',

    // Employee Status
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',

    // Add Employee Form
    add_employee_title: 'Add New Employee',
    edit_employee_title: 'Edit Employee',
    update_employee: 'Update Employee',
    editing_employee_info: 'You are editing',
    employee_not_found: 'Employee Not Found',
    employee_not_found_message:
      'The employee you are trying to edit could not be found.',
    back_to_list: 'Back to Employee List',
    employee_information: 'Employee Information',
    personal_info: 'Personal Information',
    contact_info: 'Contact Information',
    employment_info: 'Employment Information',
    first_name_label: 'First Name',
    last_name_label: 'Last Name',
    email_label: 'Email Address',
    phone_label: 'Phone',
    department_label: 'Department',
    position_label: 'Position',
    hire_date_label: 'Hire Date',
    salary_label: 'Salary',
    status_label: 'Status',

    // Form Placeholders
    enter_first_name: 'Enter first name',
    enter_last_name: 'Enter last name',
    enter_email: 'Enter email address',
    enter_phone: 'Enter phone number',
    select_department: 'Select department',
    enter_position: 'Enter position',
    select_date: 'Select date',
    enter_salary: 'Enter salary amount',
    select_status: 'Select status',

    // Job Levels
    junior: 'Junior',
    mid_level: 'Mid-Level',
    senior: 'Senior',
    lead: 'Lead',
    manager: 'Manager',
    director: 'Director',

    // Departments
    engineering: 'Engineering',
    marketing: 'Marketing',
    sales: 'Sales',
    hr: 'Human Resources',
    finance: 'Finance',
    operations: 'Operations',
    it: 'Information Technology',
    design: 'Design',

    // Validation Messages
    required_field: 'This field is required',
    invalid_email: 'Please enter a valid email address',
    invalid_phone: 'Please enter a valid phone number',
    salary_min: 'Salary must be at least 0',
    date_birth_before_employment:
      'Date of birth must be before employment date',
    employee_min_age: 'Employee must be at least 18 years old',

    // Form placeholders and selects
    select_position: 'Please Select',

    // Position options
    junior_developer: 'Junior Developer',
    senior_developer: 'Senior Developer',
    product_manager: 'Product Manager',
    ux_designer: 'UX Designer',
    data_analyst: 'Data Analyst',

    // Confirmation messages
    unsaved_changes_warning:
      'You have unsaved changes. Are you sure you want to cancel?',
    delete_employee_title: 'Are you sure?',
    delete_employee_message: 'Selected Employee record of',
    will_be_deleted: 'will be deleted',
    delete_selected_employees_title: 'Delete Selected Employees',
    delete_selected_employees_message:
      'The following employees will be deleted:',
    delete_all: 'Delete All',
    bulk_delete_warning: 'This action cannot be undone!',
    proceed: 'Proceed',
    delete_confirmation:
      'This action cannot be undone. Are you sure you want to continue?',

    // Success Messages
    employee_added: 'Employee added successfully',
    employee_updated: 'Employee updated successfully',
    employee_deleted: 'Employee deleted successfully',

    // Error Messages
    employee_add_error: 'Error occurred while adding employee',
    employee_update_error: 'Error occurred while updating employee',
    employee_delete_error: 'Error occurred while deleting employee',
    network_error: 'Network connection error',
    server_error: 'Server error',

    // Pagination
    page: 'Page',
    per_page: 'Per page',
    first_page: 'First page',
    last_page: 'Last page',
    rows_per_page: 'Rows per page',

    // User Info
    welcome: 'Welcome',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    change_language: 'Change Language',

    // 404 Page
    page_not_found: 'Page Not Found',
    page_not_found_description:
      'The page you are looking for does not exist or may have been moved.',
    go_home: 'Go Home',

    // Date Format
    date_format: 'MM/DD/YYYY',
    currency_symbol: '$',
  },
};

/**
 * Gets the current language from the HTML document
 * @returns {string} Language code (tr or en)
 */
export function getCurrentLanguage() {
  const htmlLang = document.documentElement.lang || 'tr';
  return translations[htmlLang] ? htmlLang : 'tr'; // Default to Turkish
}

/**
 * Gets a translated string for the given key
 * @param {string} key - Translation key
 * @param {string} fallback - Fallback text if translation not found
 * @returns {string} Translated string
 */
export function t(key, fallback = key) {
  const lang = getCurrentLanguage();
  const translation = translations[lang]?.[key];
  return translation || fallback;
}

/**
 * Gets all translations for the current language
 * @returns {Object} Translation object for current language
 */
export function getCurrentTranslations() {
  const lang = getCurrentLanguage();
  return translations[lang] || translations['tr'];
}

/**
 * Formats a date according to the current locale
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!date) return '';

  const dateObj = date instanceof Date ? date : new Date(date);
  const lang = getCurrentLanguage();

  if (lang === 'tr') {
    return dateObj.toLocaleDateString('tr-TR');
  } else {
    return dateObj.toLocaleDateString('en-US');
  }
}

/**
 * Formats a currency amount according to the current locale
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  if (typeof amount !== 'number') return '';

  const lang = getCurrentLanguage();

  if (lang === 'tr') {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }
}

/**
 * Formats a number according to the current locale
 * @param {number} number - Number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(number) {
  if (typeof number !== 'number') return '';

  const lang = getCurrentLanguage();

  if (lang === 'tr') {
    return new Intl.NumberFormat('tr-TR').format(number);
  } else {
    return new Intl.NumberFormat('en-US').format(number);
  }
}

/**
 * Gets the display name for a position key
 * @param {string} positionKey - Position key (e.g., 'junior-developer')
 * @returns {string} Localized position display name
 */
export function getPositionDisplayName(positionKey) {
  const positionMap = {
    'junior-developer': t('junior_developer', 'Junior Developer'),
    'senior-developer': t('senior_developer', 'Senior Developer'),
    'product-manager': t('product_manager', 'Product Manager'),
    'ux-designer': t('ux_designer', 'UX Designer'),
    'data-analyst': t('data_analyst', 'Data Analyst'),
  };
  return positionMap[positionKey] || positionKey;
}

/**
 * Base class for localized web components
 * Provides automatic re-rendering when language changes
 */
export class LocalizedElement extends HTMLElement {
  constructor() {
    super();
    this._boundLanguageChangeHandler = this._handleLanguageChange.bind(this);
  }

  connectedCallback() {
    // Listen for language changes
    document.addEventListener(
      'languagechange',
      this._boundLanguageChangeHandler
    );
    // Also listen for manual lang attribute changes
    this._observer = new MutationObserver(this._boundLanguageChangeHandler);
    this._observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });
  }

  disconnectedCallback() {
    document.removeEventListener(
      'languagechange',
      this._boundLanguageChangeHandler
    );
    if (this._observer) {
      this._observer.disconnect();
    }
  }

  _handleLanguageChange() {
    // Trigger re-render in Lit components
    if (this.requestUpdate) {
      this.requestUpdate();
    }
  }

  /**
   * Helper method for getting translations in components
   * @param {string} key - Translation key
   * @param {string} fallback - Fallback text
   * @returns {string} Translated string
   */
  t(key, fallback) {
    return t(key, fallback);
  }
}
