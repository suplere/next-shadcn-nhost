import { EventResponse } from "./../types/events";
export async function createUserHandler(body: any): Promise<EventResponse> {
  const out: EventResponse = {
    message: "",
    status: 200,
  };
  try {
    out.message = "User hash updated";
  } catch (error) {
    out.status = 400;
    out.message = "Error UserCreate event";
  }

  return out;
}
