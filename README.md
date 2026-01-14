# Almeida & Pimentel – Site

Site estático moderno e responsivo, com:
- Design padronizado e profissional
- Apresentação de dois profissionais com fotos
- Slogan atualizado
- Formulário de contato (envio para múltiplos e-mails via `mailto`)
- Botão de WhatsApp flutuante
- Casos de sucesso, notícias e endereços úteis
- Quadro de aviso flutuante
- Videochamada embutida via Jitsi
- SEO básico com JSON-LD (LegalService)

## Como configurar
1. Coloque a logo em `assets/logo.png` (arquivo da marca anexado).
	- Também é usada como favicon.
2. Coloque as fotos das advogadas em:
	- `assets/profissional1.png` (primeira advogada)
	- `assets/profissional2.png` (segunda advogada)
	- Preferência: fundo transparente ou branco, proporção quadrada.
3. Ajuste os destinatários do formulário em `index.html`, atributo `data-recipients` (separe por `;`).
4. Ajuste o número de WhatsApp em `data-whatsapp` (formato internacional, ex: `5581XXXXXXXXX`).
5. Preencha o endereço no bloco JSON-LD dentro de `index.html`.
6. (Opcional) Preencha `importantNotices` em `assets/script.js` para exibir comunicados.
7. Customize os nomes e especialidades das advogadas na seção "Nossos Profissionais" em `index.html`.

## Hospedagem
Funciona em qualquer servidor estático (GitHub Pages, Netlify, Vercel, hospedagem própria). Inclua `robots.txt` e (opcional) `sitemap.xml`.

## Observações
- Para envio de e-mail com conteúdo no corpo, usamos `mailto` para múltiplos destinatários. Para envio robusto, pode-se integrar EmailJS, SendGrid ou backend próprio.
- A videochamada usa Jitsi (`meet.jit.si`). Para sala privada/configurações avançadas, crie uma instância própria.
- O design foi padronizado com espaçamentos, tipografia e cores consistentes em todo o site.

