const { isValid, validateEmail } = require('./request');

const noContent = {
  contacts: [
    { id: '1', name: 'sam', email: 'sam@test.fr' },
    { id: '2', name: 'dam', email: 'dam@test.fr' },
    { id: '3', name: 'aline', email: 'aline@test.fr' },
  ],
};

const contactsString = {
  contacts: 'test',
  content: "<div style='text-align: center;'>test</div>",
};

const notEnoughContacts = {
  contacts: [
    { id: '1', name: 'sam', email: 'sam@test.fr' },
    { id: '2', name: 'dam', email: 'dam@test.fr' },
  ],
  content: "<div style='text-align: center;'>test</div>",
};

const tooMuchContacts = {
  contacts: [
    { id: '1', name: '1', email: '1@1.fr' },
    { id: '2', name: '2', email: '2@2.fr' },
    { id: '3', name: '3', email: '3@3.fr' },
    { id: '4', name: '4', email: '4@4.fr' },
    { id: '5', name: '5', email: '5@5.fr' },
    { id: '6', name: '6', email: '6@6.fr' },
    { id: '7', name: '7', email: '7@7.fr' },
    { id: '8', name: '8', email: '8@8.fr' },
    { id: '9', name: '9', email: '9@9.fr' },
    { id: '10', name: '10', email: '10@10.fr' },
    { id: '11', name: '11', email: '11@11.fr' },
    { id: '12', name: '12', email: '12@12.fr' },
    { id: '13', name: '13', email: '13@13.fr' },
    { id: '14', name: '14', email: '14@14.fr' },
    { id: '15', name: '15', email: '15@15.fr' },
    { id: '16', name: '16', email: '16@16.fr' },
    { id: '17', name: '17', email: '17@17.fr' },
    { id: '18', name: '18', email: '18@18.fr' },
    { id: '19', name: '19', email: '19@19.fr' },
    { id: '20', name: '20', email: '20@20.fr' },
    { id: '21', name: '21', email: '21@21.fr' },
  ],
  content: "<div style='text-align: center;'>test</div>",
};

const invalidMail = {
  contacts: [
    { id: 1, name: 'sam', email: 'samtest.fr' },
    { id: 2, name: 'dam', email: 'dam@test.fr' },
    { id: 3, name: 'aline', email: 'aline@test.fr' },
  ],
  content: "<div style='text-align: center;'>test</div>",
};

const invalidName = {
  contacts: [
    { id: 1, name: '', email: 'sam@test.fr' },
    {
      id: 2, name: 'dam', email: 'dam@test.fr', id: 1,
    },
    { id: 3, name: 'aline', email: 'aline@test.fr' },
  ],
  content: "<div style='text-align: center;'>test</div>",
};

const duplicateMail = {
  contacts: [
    { id: 1, name: 'sam', email: 'sam@test.fr' },
    { id: 2, name: 'dam', email: 'dam@test.fr' },
    { id: 3, name: 'aline', email: 'sam@test.fr' },
  ],
  content: "<div style='text-align: center;'>test</div>",
};
const forbiddenWithString = {
  contacts: [
    {
      id: 1, name: 'sam', email: 'sam@test.fr', forbidden: 'blabla',
    },
    { id: 2, name: 'dam', email: 'dam@test.fr' },
    { id: 3, name: 'aline', email: 'aline@test.fr' },
  ],
  content: "<div style='text-align: center;'>test</div>",
};
const forbiddenWithoutIds = {
  contacts: [
    {
      id: 1, name: 'sam', email: 'sam@test.fr', forbidden: ['4'],
    },
    { id: 2, name: 'dam', email: 'dam@test.fr' },
    { id: 3, name: 'aline', email: 'aline@test.fr' },
  ],
  content: "<div style='text-align: center;'>test</div>",
};
const forbiddenOutOfList = {
  contacts: [
    {
      id: '1', name: 'sam', email: 'sam@test.fr', forbidden: ['4'],
    },
    { id: '2', name: 'dam', email: 'dam@test.fr' },
    { id: '3', name: 'aline', email: 'aline@test.fr' },
  ],
  content: "<div style='text-align: center;'>test</div>",
};
const dupplicatesIds = {
  contacts: [
    {
      id: '1', name: 'sam', email: 'sam@test.fr', forbidden: ['4'],
    },
    { id: '1', name: 'dam', email: 'dam@test.fr' },
    { id: '1', name: 'aline', email: 'aline@test.fr' },
  ],
  content: "<div style='text-align: center;'>test</div>",
};
const impossibleForbiddenRules = {
  contacts: [
    {
      id: '1', name: 'sam', email: 'sam@test.fr', forbidden: ['2'],
    },
    {
      id: '2', name: 'dam', email: 'dam@test.fr', forbidden: ['1'],
    },
    { id: '3', name: 'aline', email: 'aline@test.fr' },
  ],
  content: "<div style='text-align: center;'>test</div>",
};

const good = {
  contacts: [
    { id: 1, name: 'sam', email: 'sam@test.fr' },
    { id: 2, name: 'dam', email: 'dam@test.fr' },
    { id: 3, name: 'aline', email: 'ali@test.fr' },
  ],
  content: "<div style='text-align: center;'>test</div>",
};
const goodWithForbidden = {
  contacts: [
    {
      id: 1, name: 'sam', email: 'sam@test.fr', forbidden: [3],
    },
    {
      id: 2, name: 'dam', email: 'dam@test.fr', forbidden: [1],
    },
    {
      id: 3, name: 'aline', email: 'ali@test.fr', forbidden: [2],
    },
  ],
  content: "<div style='text-align: center;'>test</div>",
};

describe('isValid', () => {
  it('should return false if parameters have no content', () => {
    expect(isValid(noContent)).toEqual(false);
  });
  it('should return false if contacts is not an array', () => {
    expect(isValid(contactsString)).toEqual(false);
  });
  it('should return false if contacts is an array smaller than 3', () => {
    expect(isValid(notEnoughContacts)).toEqual(false);
  });
  it('should return false if contacts is an array bigger than 20', () => {
    expect(isValid(tooMuchContacts)).toEqual(false);
  });
  it('should return false if mail is invalid', () => {
    expect(isValid(invalidMail)).toEqual(false);
  });
  it('should return false if mail is not uniq', () => {
    expect(isValid(duplicateMail)).toEqual(false);
  });
  it('should return false if forbidden is not an array', () => {
    expect(isValid(forbiddenWithString)).toEqual(false);
  });
  it('should return false if no id', () => {
    expect(isValid(forbiddenWithoutIds)).toEqual(false);
  });
  it('should return false if ids are not uniq', () => {
    expect(isValid(dupplicatesIds)).toEqual(false);
  });
  it('should return false if forbidden are not in the list', () => {
    expect(isValid(forbiddenOutOfList)).toEqual(false);
  });
  it('should return false if forbidden rules are impossible', () => {
    expect(isValid(impossibleForbiddenRules)).toEqual(false);
  });
  it('should return true if params are ok', () => {
    expect(isValid(good)).toEqual(true);
    expect(isValid(goodWithForbidden)).toEqual(true);
  });
});

describe('validateEmail', () => {
  it('should return true if valid', () => {
    expect(validateEmail('sam@test.fr')).toEqual(true);
  });
  it('should return false if invalid', () => {
    expect(validateEmail('sammdaz.fr')).toEqual(false);
  });
});
