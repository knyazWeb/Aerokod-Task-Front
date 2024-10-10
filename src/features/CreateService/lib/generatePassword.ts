export function generatePassword(
  length: number,
  useLetters: boolean,
  useSymbols: boolean,
  useSpecialCharacters: boolean,
  caseOption: 'random' | 'lowercase' | 'uppercase',
  customSymbols: string | null,
): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const symbols = '0123456789';
  const specialCharacters = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let characters = '';
  if (useLetters) {
    if (caseOption === 'random') {
      if (Math.random() > 0.5) {
        characters += letters.toUpperCase();
        characters += letters;
      } else {
        characters += letters;
      }
    } else if (caseOption === 'uppercase') {
      characters = letters.toUpperCase();
    } else if (caseOption === 'lowercase') {
      characters = letters;
    }
  }
  if (useSymbols) {
    characters += symbols;
  }
  if (useSpecialCharacters) {
    characters += specialCharacters;
  }

  if (customSymbols !== null) characters = customSymbols;

  if (characters.length === 0) {
    return '';
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}
