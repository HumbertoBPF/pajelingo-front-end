import { faker } from "@faker-js/faker/locale/en_US";
import { badges } from "./badges";

export const getUnauthenticatedUser = (picture = null) => {
  return {
    username: faker.internet.userName(),
    bio: faker.string.alphanumeric({ length: { min: 1, max: 75 } }),
    badges,
    picture
  };
};

export const getAuthenticatedUser = (picture = null) => {
  const user = getUnauthenticatedUser(picture);

  user.token = "token";
  user.email = faker.internet.email();

  return user;
};
