class Place {
  constructor(title, imageUri, address, location) {
    (this.title = title),
      (this.imageUri = imageUri),
      (this.address = address),
      (this.location = location); // {lat: 0.141241, lng: 127.121}
    this.id = Date.now().toString() + Math.random().toString();
  }
}
