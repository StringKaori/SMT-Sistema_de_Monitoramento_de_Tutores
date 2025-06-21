import { Classrooms } from "@common/types/Classrooms";
import { connector } from "../connector";

const endpoint = "/dashboard";

const getAllClassroomsListByFloor = async (
  floor: number,
) => {
  try {
    const response = await connector.get(`${endpoint}/classrooms?floor=${floor}`);
    return response.data as Classrooms[];
  } catch (e) {
    console.error(e);
  }
};

export { getAllClassroomsListByFloor };