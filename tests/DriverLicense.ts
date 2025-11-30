class DriverLicense {
  // властивості
  birthDate: string;
  category: string;
  documentId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  expirationDate: string;
  lastUpdate: Date;
  authority: string;
  categoryIssuingDate: string;
  photo: string | Buffer;

  // явний та не явний, дефолтний
  constructor(
    birthDate: string,
    category: string,
    firstName: string,
    lastName: string,
    middleName: string,
    authority: string,
    photo: string
  ) {
    this.birthDate = birthDate;
    this.category = category;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.authority = authority;
    this.photo = photo;

    this.documentId = "ABC" + Math.random() * 100; // рандомний ID
    this.lastUpdate = new Date();
  }

  // методи (поведінка)
  copyDocumentID() {
    return this.documentId;
  }
  showFullInfo() {
    return this;
  }
  translating() {
    console.log("Translating...");
  }
  replaceDocument() {
    console.log("Creating replace request...");
  }
}

// екземпляр класу

const driverLicense1 = new DriverLicense(
  "03-09-81",
  "B",
  "Olena",
  "Lisova",
  "Uriivna",
  "MREO",
  "C://photo"
);
console.log(driverLicense1);
driverLicense1.replaceDocument();

const driverLicense2 = new DriverLicense(
  "03-09-81",
  "B",
  "Test",
  "Test",
  "Test",
  "Test",
  "C://photo"
);

console.log(driverLicense2);
console.log(driverLicense1.documentId);
console.log(driverLicense1.lastUpdate);
