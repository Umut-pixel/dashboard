"use client"

interface CSSStyles {
  color?: string
  backgroundColor?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  padding?: string
  margin?: string
  borderRadius?: string
  border?: string
  boxShadow?: string
  textAlign?: string
  lineHeight?: string
  letterSpacing?: string
  textTransform?: string
  opacity?: string
  transform?: string
  transition?: string
}

export function applyStyles(styles: CSSStyles): React.CSSProperties {
  return {
    ...(styles.color && { color: styles.color }),
    ...(styles.backgroundColor && { backgroundColor: styles.backgroundColor }),
    ...(styles.fontSize && { fontSize: styles.fontSize }),
    ...(styles.fontWeight && { fontWeight: styles.fontWeight }),
    ...(styles.fontFamily && { fontFamily: styles.fontFamily }),
    ...(styles.padding && { padding: styles.padding }),
    ...(styles.margin && { margin: styles.margin }),
    ...(styles.borderRadius && { borderRadius: styles.borderRadius }),
    ...(styles.border && { border: styles.border }),
    ...(styles.boxShadow && { boxShadow: styles.boxShadow }),
    ...(styles.textAlign && { textAlign: styles.textAlign as any }),
    ...(styles.lineHeight && { lineHeight: styles.lineHeight }),
    ...(styles.letterSpacing && { letterSpacing: styles.letterSpacing }),
    ...(styles.textTransform && { textTransform: styles.textTransform as any }),
    ...(styles.opacity && { opacity: styles.opacity }),
    ...(styles.transform && { transform: styles.transform }),
    ...(styles.transition && { transition: styles.transition })
  }
}
