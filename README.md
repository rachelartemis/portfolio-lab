# portfolio-lab

Personal portfolio website served with **Nginx** inside **Docker**, secured with **TLS/SSL**.  
Built as Lab 09 for Network Security Systems — Vizja University Warsaw (2026).

## Stack

| Tool | Purpose |
|---|---|
| Nginx (nginx:alpine) | Web server |
| Docker / Docker Compose | Container runtime |
| OpenSSL | Self-signed RSA-4096 TLS certificate |
| TLSv1.3 | Encryption protocol negotiated |
| Wireshark | HTTP vs HTTPS traffic analysis |

## Quick Start

**1. Generate certificate:**
```bash
docker run --rm -v "${PWD}:/output" alpine/openssl req \
  -x509 -newkey rsa:4096 \
  -keyout /output/nginx.private.key \
  -out /output/nginx.crt \
  -days 365 -nodes -subj "/CN=localhost"
```

**2. Start server:**
```bash
docker compose up -d
```

**3. Open:** `https://localhost` — accept the self-signed cert warning and proceed.

## Author

**Batu Guldogan** — [@rachelartemis](https://github.com/rachelartemis)  
Computer Science — Vizja University Warsaw
