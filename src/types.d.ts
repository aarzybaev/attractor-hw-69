
export interface ApiSerial {
  show: {
    id: string;
    name: string;
  }
}

export interface OneSerial {
  id: string;
  name: string;
  image: {
    medium: string;
  };
  summary: string;
}
