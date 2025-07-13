type Language = 'python' | 'javascript' | 'c' | 'java';

const LANG_KEYWORDS: Record<string, Set<string>> = {
  "python": new Set([
    'False', 'await', 'else', 'import', 'pass', 'None', 'break', 'except',
    'in', 'raise', 'True', 'class', 'finally', 'is', 'return', 'and', 'continue',
    'for', 'lambda', 'try', 'as', 'def', 'from', 'nonlocal', 'while', 'assert',
    'del', 'global', 'not', 'with', 'async', 'elif', 'if', 'or', 'yield','range','len','print'
  ]),
  "javascript": new Set([
    'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
    'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function',
    'if', 'import', 'in', 'instanceof', 'let', 'new', 'return', 'super', 'switch',
    'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield'
  ]),
  "c": new Set([
    'auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do',
    'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'inline',
    'int', 'long', 'register', 'restrict', 'return', 'short', 'signed', 'sizeof',
    'static', 'struct', 'switch', 'typedef', 'union', 'unsigned', 'void',
    'volatile', 'while', '_Alignas', '_Alignof', '_Atomic', '_Bool', '_Complex',
    '_Generic', '_Imaginary', '_Noreturn', '_Static_assert', '_Thread_local'
  ]),
  "java": new Set([
    'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char',
    'class', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum',
    'extends', 'final', 'finally', 'float', 'for', 'goto', 'if', 'implements',
    'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new', 'package',
    'private', 'protected', 'public', 'return', 'short', 'static', 'strictfp',
    'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient',
    'try', 'void', 'volatile', 'while', 'true', 'false', 'null'
  ])
};

export function extractIdentifiersWithCounts(code: string, language: string): Record<string, number> {
  if (!LANG_KEYWORDS[language]) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const identifierRegex = /\b[_a-zA-Z][_a-zA-Z0-9]*\b/g;
  const allIdentifiers = code.match(identifierRegex) || [];

  const counts: Record<string, number> = {};
  const keywords = LANG_KEYWORDS[language];

  for (const id of allIdentifiers) {
    if (!keywords.has(id)) {
      counts[id] = (counts[id] || 0) + 1;
    }
  }

  return counts;
}
