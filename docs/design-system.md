# Design System

## Paleta de Cores

| Nome          | Hex     | Preview                                                         |
| ------------- | ------- | --------------------------------------------------------------- |
| Laranja       | #cc6200 | ![#cc6200](https://via.placeholder.com/20/cc6200/000000?text=+) |
| Bege Claro    | #ffddc2 | ![#ffddc2](https://via.placeholder.com/20/ffddc2/000000?text=+) |
| Off White     | #fff7f0 | ![#fff7f0](https://via.placeholder.com/20/fff7f0/000000?text=+) |
| Marrom Escuro | #593100 | ![#593100](https://via.placeholder.com/20/593100/000000?text=+) |

Essas são as cores base do nosso sistema de design. Utilize-as para garantir consistência visual em toda a aplicação.

---

## Como usar no Tailwind 4

No Tailwind 4, as cores customizadas são declaradas como variáveis CSS dentro do bloco `@theme` no seu arquivo global de CSS (ex: `globals.css`).

```css
@theme inline {
  --color-primary: #cc6200;
  --color-beige: #ffddc2;
  --color-offwhite: #fff7f0;
  --color-brown: #593100;
}
```

Para utilizar as cores nos componentes, use a sintaxe:

```jsx
<div className="bg-[--color-primary] text-[--color-offwhite]">
  Exemplo com as cores customizadas!
</div>
```

Assim, você garante que toda a aplicação utilize a paleta definida de forma centralizada e fácil de manter.

---

> Atualize este documento conforme o design system evoluir (tipografia, espaçamentos, componentes, etc).
