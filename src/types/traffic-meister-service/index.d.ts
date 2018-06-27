interface ITrafficMeister {
  fetchData(cb: (err: string, data: IVehicle[]) => void): void;
}

interface IVehicle {
  id: number;
  type: string;
  brand: string;
  colors: string[];
  img: null | string;
}
