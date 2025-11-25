# Documentation Writing Guidelines

This document defines standards for writing Logo.dev documentation. It is used by Cursor and Claude Code to maintain consistency.

## API Key Terminology

Logo.dev uses two types of API keys. Always use the correct terminology.

### Official Terms

| Term                | Prefix | Purpose                                      | Security             |
| ------------------- | ------ | -------------------------------------------- | -------------------- |
| **Publishable Key** | `pk_`  | Image CDN (`img.logo.dev`) via `token` param | Safe for client-side |
| **Secret Key**      | `sk_`  | REST APIs via `Authorization: Bearer` header | Server-side only     |

### Placeholder Standards

Use these exact placeholders in code examples:

| Key Type            | Placeholder                |
| ------------------- | -------------------------- |
| **Publishable Key** | `LOGO_DEV_PUBLISHABLE_KEY` |
| **Secret Key**      | `LOGO_DEV_SECRET_KEY`      |

These placeholders work as both inline examples and environment variable names, making it easy for developers to copy examples directly.

### URL Path Parameters

Use **lowercase with colon prefix** for URL path parameters:

- `:domain` - for domain lookups (e.g., `stripe.com`)
- `:symbol` - for ticker/crypto symbols (e.g., `AAPL`, `BTC`)
- `:query` - for search queries
- `:isin` - for ISIN codes
- `:brand` - for brand name lookups

### URL Examples

For the image CDN (publishable key):

```html
<img
  src="https://img.logo.dev/:domain?token=LOGO_DEV_PUBLISHABLE_KEY"
  alt="Company logo"
/>
```

For REST APIs (secret key):

```bash
curl --header "Authorization: Bearer LOGO_DEV_SECRET_KEY" "https://api.logo.dev/search?q=:query"
```

For environment variable setup:

```bash
LOGO_DEV_PUBLISHABLE_KEY=pk_xxxxxxxxxxxx
LOGO_DEV_SECRET_KEY=sk_xxxxxxxxxxxx
```

For framework-specific env vars (e.g., Next.js client-side):

```bash
NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY=pk_xxxxxxxxxxxx
```

### Terms to Avoid

Do NOT use these terms when referring to API keys:

| Incorrect Term    | Correct Term                                |
| ----------------- | ------------------------------------------- |
| public key        | publishable key                             |
| public token      | publishable key                             |
| private key       | secret key                                  |
| API key (generic) | publishable key or secret key (be specific) |
| token (alone)     | publishable key (for image CDN)             |

### Context Guidelines

- When discussing the **image CDN** (`img.logo.dev`), always refer to "publishable key"
- When discussing **REST APIs** (search, describe), always refer to "secret key"
- The `token` parameter in URLs takes a publishable key
- The `Authorization: Bearer` header takes a secret key

### Examples of Correct Usage

**Correct:**

> "Get your publishable key from the dashboard and add it to the `token` parameter."

**Incorrect:**

> "Get your public key from the dashboard and add it to the `token` parameter."

**Correct:**

> "Use your secret key in the Authorization header to access the Search API."

**Incorrect:**

> "Use your private key in the Authorization header to access the Search API."

### Code Example Patterns

Always include the token parameter in URL examples:

```html
<!-- Correct: includes token -->
<img src="https://img.logo.dev/stripe.com?token=LOGO_DEV_PUBLISHABLE_KEY" />

<!-- Incorrect: missing token -->
<img src="https://img.logo.dev/stripe.com" />
```

## Security Features Terminology

### Domain Restrictions

The feature that restricts publishable key usage to specific domains.

| Term                     | Usage                                              |
| ------------------------ | -------------------------------------------------- |
| **domain restrictions**  | The feature name (lowercase in prose)              |
| **Allowed Domains Only** | The toggle label in the dashboard (title case)     |
| **referrer**             | The HTTP header that identifies the request origin |
| **whitelist**            | Avoid — use "allowed domains" instead              |
| **blacklist**            | Avoid — use "blocked" or "restricted" instead      |

### Referrer-Policy Values

When documenting referrer configuration:

- Use `strict-origin-when-cross-origin` as the recommended default
- Use `origin` as the simplest option that works with domain restrictions
- Warn against `no-referrer` and `same-origin` as they break domain restrictions
