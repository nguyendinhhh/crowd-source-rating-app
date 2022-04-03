import { css } from '@emotion/css'

const theme = {
    type: {
		root: '14px',
		small: '50px',
		bold: '700',
	},
	color: {
		title: '#0055A2',
	}
}

const h1 = `
	font-size: ${theme.type.small};
	font-weight: ${theme.type.bold};
	line-height: 1.1;
	color: blue;
`

const cn = {
	h1: css(h1),
}

export { theme, cn };