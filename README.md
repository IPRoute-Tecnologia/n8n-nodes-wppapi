# @iproute/n8n-nodes-wppapi

Community node do [n8n](https://n8n.io) para a [WPPAPI](https://wpp-api.com?utm_source=github&utm_medium=n8n) — API WhatsApp gerenciada, com webhooks HMAC e integração nativa com Chatwoot.

**Operações:** enviar texto, enviar imagem, enviar arquivo, verificar número, status da sessão.

## Instalação

No n8n: **Settings → Community Nodes → Install** e informe `@iproute/n8n-nodes-wppapi`.

## Credenciais

Crie uma conta na [WPPAPI](https://app.wpp-api.com/register?utm_source=github&utm_medium=n8n) (trial de 3 dias, sem cartão), conecte um número via QR Code e copie do painel:

- **Base URL**: `https://api.wpp-api.com`
- **Instance ID**: ID público da instância
- **Token**: token da instância

O node autentica via header `Client-Token` — o token não aparece em URLs nem logs.

## Receber mensagens

Use o **Webhook node** nativo do n8n: cadastre a URL de produção no painel da WPPAPI (evento de mensagem recebida). Guia completo: [WhatsApp no n8n](https://wpp-api.com/guias/whatsapp-n8n?utm_source=github&utm_medium=n8n).

## Desenvolvimento

```bash
npm install
npm run build
```

## Licença

MIT © IPRoute Tecnologia
