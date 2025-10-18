// Compatibility shim: some tests import ../pages/RegisterPage (PascalCase) while the source filename is signUpPage.ts
// Export the RegisterPage class from signUpPage to satisfy imports on case-sensitive filesystems (Linux CI).
export { RegisterPage } from './signUpPage';
