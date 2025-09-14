# Logo.dev Documentation

Official documentation for [Logo.dev](https://logo.dev) - the comprehensive logo API that provides instant access to millions of company logos, cryptocurrency icons, and stock ticker symbols.

## Overview

Logo.dev offers multiple APIs to fetch brand assets programmatically:

- **Logo Images API** - Fetch company logos by domain name
- **Stock Ticker API** - Get logos using stock ticker symbols  
- **Cryptocurrency API** - Access crypto logos by symbol
- **Brand Search API** - Convert brand names to domains
- **Describe API** - Get brand metadata including colors and social links

## Quick Start

### Prerequisites

- Node.js 18+ installed
- Logo.dev API key (get yours at [logo.dev/dashboard](https://www.logo.dev/dashboard))

### Installation

Install the Mintlify CLI to preview documentation locally:

```bash
npm install -g mint
```

### Local Development

1. Clone this repository
2. Navigate to the project root (where `mint.json` is located)
3. Start the development server:

```bash
mint dev
```

The documentation will be available at `http://localhost:3000`

### Development Commands

```bash
# Preview on specific port
mint dev --port 3333

# Update Mintlify CLI
mint update

# Check for broken links
mint broken-links

# Validate OpenAPI specs
mint openapi-check <filename>
```

## Documentation Structure

```
├── introduction.mdx        # Getting started guide
├── logo-images/           # Logo API documentation
│   ├── introduction.mdx   # API overview and parameters
│   ├── get.mdx           # Endpoint details
│   ├── ticker.mdx        # Stock ticker logos
│   └── crypto.mdx        # Cryptocurrency logos
├── brand-search/          # Brand Search API
├── describe/              # Describe API
├── platform/              # Platform features
│   ├── api-keys.mdx      # API key management
│   ├── rate-limits.mdx   # Rate limiting policies
│   └── attribution.mdx   # Attribution requirements
└── support/               # Support resources
```

## API Usage Examples

### Basic Logo Fetch

```html
<img src="https://img.logo.dev/apple.com?token=YOUR-KEY-HERE" />
```

### Stock Ticker Logo

```html
<img src="https://img.logo.dev/ticker/AAPL?token=YOUR-KEY-HERE" />
```

### Cryptocurrency Logo

```html
<img src="https://img.logo.dev/crypto/btc?token=YOUR-KEY-HERE" />
```

## Configuration

The documentation is configured via `mint.json`:

- **Branding** - Logo, favicon, and color scheme
- **Navigation** - Sidebar structure and page ordering
- **Analytics** - Tracking configuration
- **CTAs** - Dashboard and support links

## Deployment

### Automatic Deployment

Install the [Mintlify GitHub App](https://github.com/apps/mintlify) to auto-deploy changes:

1. Push changes to your default branch
2. Changes deploy automatically to production
3. Monitor deployment status in your dashboard

### Manual Deployment

For manual deployments or custom workflows, contact the Mintlify team.

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| `mint dev` not running | Run `mint install` to reinstall dependencies |
| Page loads as 404 | Ensure you're in the directory with `mint.json` |
| CLI installation fails | Check Node.js version (requires 18+) |
| Preview port in use | Use `mint dev --port <port>` |

### Getting Help

- **API Support**: [support@logo.dev](mailto:support@logo.dev)
- **Documentation Issues**: Open an issue in this repository
- **API Status**: Check [status.logo.dev](https://status.logo.dev)

## Contributing

We welcome contributions to improve our documentation:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Run `mint broken-links` to validate
5. Submit a pull request

### Documentation Guidelines

- Use clear, concise language
- Include code examples for all endpoints
- Test all examples before submitting
- Follow the existing format and structure

## Resources

- [Logo.dev Dashboard](https://www.logo.dev/dashboard) - Manage API keys
- [API Reference](https://docs.logo.dev) - Full API documentation
- [Status Page](https://status.logo.dev) - Service availability
- [Pricing](https://logo.dev/pricing) - Plan details and limits

## License

This documentation is proprietary to Logo.dev. See [Terms of Service](https://logo.dev/terms) for usage guidelines.

