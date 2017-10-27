const { isValid, validateEmail } = require("./request");

const noContent = {
  contacts: [
    { id: "1", name: "sam", mail: "sam@test.fr" },
    { id: "2", name: "dam", mail: "dam@test.fr" },
    { id: "3", name: "aline", mail: "aline@test.fr" }
  ]
};

const contactsString = {
  contacts: "test",
  content: "<div style='text-align: center;'>test</div>"
};

const notEnoughContacts = {
  contacts: [
    { id: "1", name: "sam", mail: "sam@test.fr" },
    { id: "2", name: "dam", mail: "dam@test.fr" }
  ],
  content: "<div style='text-align: center;'>test</div>"
};

const tooMuchContacts = {
  contacts: [
    { id: "1", name: "1", mail: "1@1.fr" },
    { id: "2", name: "2", mail: "2@2.fr" },
    { id: "3", name: "3", mail: "3@3.fr" },
    { id: "4", name: "4", mail: "4@4.fr" },
    { id: "5", name: "5", mail: "5@5.fr" },
    { id: "6", name: "6", mail: "6@6.fr" },
    { id: "7", name: "7", mail: "7@7.fr" },
    { id: "8", name: "8", mail: "8@8.fr" },
    { id: "9", name: "9", mail: "9@9.fr" },
    { id: "10", name: "10", mail: "10@10.fr" },
    { id: "11", name: "11", mail: "11@11.fr" },
    { id: "12", name: "12", mail: "12@12.fr" },
    { id: "13", name: "13", mail: "13@13.fr" },
    { id: "14", name: "14", mail: "14@14.fr" },
    { id: "15", name: "15", mail: "15@15.fr" },
    { id: "16", name: "16", mail: "16@16.fr" },
    { id: "17", name: "17", mail: "17@17.fr" },
    { id: "18", name: "18", mail: "18@18.fr" },
    { id: "19", name: "19", mail: "19@19.fr" },
    { id: "20", name: "20", mail: "20@20.fr" },
    { id: "21", name: "21", mail: "21@21.fr" }
  ],
  content: "<div style='text-align: center;'>test</div>"
};

const invalidMail = {
  contacts: [
    { id: 1, name: "sam", mail: "samtest.fr" },
    { id: 2, name: "dam", mail: "dam@test.fr" },
    { id: 3, name: "aline", mail: "aline@test.fr" }
  ],
  content: "<div style='text-align: center;'>test</div>"
};

const invalidName = {
  contacts: [
    { id: 1, name: "", mail: "sam@test.fr" },
    { id: 2, name: "dam", mail: "dam@test.fr", id: 1 },
    { id: 3, name: "aline", mail: "aline@test.fr" }
  ],
  content: "<div style='text-align: center;'>test</div>"
};

const duplicateMail = {
  contacts: [
    { id: 1, name: "sam", mail: "sam@test.fr" },
    { id: 2, name: "dam", mail: "dam@test.fr" },
    { id: 3, name: "aline", mail: "sam@test.fr" }
  ],
  content: "<div style='text-align: center;'>test</div>"
};
const forbiddenWithString = {
  contacts: [
    { id: 1, name: "sam", mail: "sam@test.fr", forbidden: "blabla" },
    { id: 2, name: "dam", mail: "dam@test.fr" },
    { id: 3, name: "aline", mail: "aline@test.fr" }
  ],
  content: "<div style='text-align: center;'>test</div>"
};
const forbiddenWithoutIds = {
  contacts: [
    { id: 1, name: "sam", mail: "sam@test.fr", forbidden: ["4"] },
    { id: 2, name: "dam", mail: "dam@test.fr" },
    { id: 3, name: "aline", mail: "aline@test.fr" }
  ],
  content: "<div style='text-align: center;'>test</div>"
};
const forbiddenOutOfList = {
  contacts: [
    { id: "1", name: "sam", mail: "sam@test.fr", forbidden: ["4"] },
    { id: "2", name: "dam", mail: "dam@test.fr" },
    { id: "3", name: "aline", mail: "aline@test.fr" }
  ],
  content: "<div style='text-align: center;'>test</div>"
};
const dupplicatesIds = {
  contacts: [
    { id: "1", name: "sam", mail: "sam@test.fr", forbidden: ["4"] },
    { id: "1", name: "dam", mail: "dam@test.fr" },
    { id: "1", name: "aline", mail: "aline@test.fr" }
  ],
  content: "<div style='text-align: center;'>test</div>"
};
const impossibleForbiddenRules = {
  contacts: [
    { id: "1", name: "sam", mail: "sam@test.fr", forbidden: ["2"] },
    { id: "2", name: "dam", mail: "dam@test.fr", forbidden: ["1"] },
    { id: "3", name: "aline", mail: "aline@test.fr" }
  ],
  content: "<div style='text-align: center;'>test</div>"
};

const good = {
  contacts: [
    { id: 1, name: "sam", mail: "sam@test.fr" },
    { id: 2, name: "dam", mail: "dam@test.fr" },
    { id: 3, name: "aline", mail: "ali@test.fr" }
  ],
  content: "<div style='text-align: center;'>test</div>"
};
const goodWithForbidden = {
  contacts: [
    { id: 1, name: "sam", mail: "sam@test.fr", forbidden: [3] },
    { id: 2, name: "dam", mail: "dam@test.fr", forbidden: [1] },
    { id: 3, name: "aline", mail: "ali@test.fr", forbidden: [2] }
  ],
  content: "<div style='text-align: center;'>test</div>"
};

describe("isValid", () => {
  it("should return false if parameters have no content", () => {
    expect(isValid(noContent)).toEqual(false);
  });
  it("should return false if contacts is not an array", () => {
    expect(isValid(contactsString)).toEqual(false);
  });
  it("should return false if contacts is an array smaller than 3", () => {
    expect(isValid(notEnoughContacts)).toEqual(false);
  });
  it("should return false if contacts is an array bigger than 20", () => {
    expect(isValid(tooMuchContacts)).toEqual(false);
  });
  it("should return false if mail is invalid", () => {
    expect(isValid(invalidMail)).toEqual(false);
  });
  it("should return false if mail is not uniq", () => {
    expect(isValid(duplicateMail)).toEqual(false);
  });
  it("should return false if forbidden is not an array", () => {
    expect(isValid(forbiddenWithString)).toEqual(false);
  });
  it("should return false if no id", () => {
    expect(isValid(forbiddenWithoutIds)).toEqual(false);
  });
  it("should return false if ids are not uniq", () => {
    expect(isValid(dupplicatesIds)).toEqual(false);
  });
  it("should return false if forbidden are not in the list", () => {
    expect(isValid(forbiddenOutOfList)).toEqual(false);
  });
  it("should return false if forbidden rules are impossible", () => {
    expect(isValid(impossibleForbiddenRules)).toEqual(false);
  });
  it("should return true if params are ok", () => {
    expect(isValid(good)).toEqual(true);
    expect(isValid(goodWithForbidden)).toEqual(true);
  });
});

describe("validateEmail", () => {
  it("should return true if valid", () => {
    expect(validateEmail("sam@test.fr")).toEqual(true);
  });
  it("should return false if invalid", () => {
    expect(validateEmail("sammdaz.fr")).toEqual(false);
  });
});
