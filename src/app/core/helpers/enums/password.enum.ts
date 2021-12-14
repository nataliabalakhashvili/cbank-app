export enum Password {
  short = 0,
  weak = 25,
  fair = 50,
  good = 75,
  strong = 100
}

export const passwordMap = {
  [Password.short]: 'Your password is too short.',
  [Password.weak]: 'Your password is weak keep going!',
  [Password.fair]: 'Your password is fair, almost there.',
  [Password.good]: 'Your password is good, keep going.',
  [Password.strong]: 'Great! This will do. Just don\'t forget him.',
}
