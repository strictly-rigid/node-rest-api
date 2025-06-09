import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  //     Викликає функцію-сервіс listContacts для роботи з json-файлом contacts.json
  // Повертає масив всіх контактів в json-форматі зі статусом 200

  const result = await contactsService.listContacts();
  res.status(200).json(result);
};

export const getOneContact = async (req, res) => {
  //         Викликає функцію-сервіс getContactById для роботи з json-файлом contacts.json
  //     Якщо контакт за id знайдений, повертає об'єкт контакту в json-форматі зі статусом 200
  //     Якщо контакт за id не знайдено, повертає json формату {"message": "Not found"} зі статусом 404

  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.status(200).json(result);
};

export const deleteContact = async (req, res) => {
  //  Викликає функцію - сервіс removeContact для роботи з json - файлом contacts.json
  // Якщо контакт за id знайдений і видалений, повертає об'єкт видаленого контакту в json-форматі зі статусом 200
  // Якщо контакт за id не знайдено, повертає json формату {"message": "Not found"} зі статусом 404};

  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }

  res.status(200).json(result);
};

export const createContact = async (req, res) => {
  //     Отримує body в json-форматі з полями {name, email, phone}. Усі поля є обов'язковими - для валідації створи у файлі contactsSchemas.js (знаходиться у папці schemas) схему з використаням пакета joi
  // Якщо в body немає якихось обов'язкових полів (або передані поля мають не валідне значення), повертає json формату {"message": error.message} (де error.message - змістовне повідомлення з суттю помилки) зі статусом 400
  // Якщо body валідне, викликає функцію-сервіс addContact для роботи з json-файлом contacts.json, з передачею їй даних з body
  // За результатом роботи функції повертає новостворений об'єкт з полями {id, name, email, phone} і статусом 201

  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  // Отримує body в json - форматі з будь - яким набором оновлених полів(name, email, phone)(всі поля вимагати в боді
  //  як обов'язкові не потрібно: якщо якесь із полів не передане,
  // воно має зберегтись у контакта зі значенням, яке було до оновлення)
  //   Якщо запит на оновлення здійснено без передачі в body хоча б одного поля, повертає json формату {"message":
  // "Body must have at least one field"} зі статусом 400.
  //   Передані в боді поля мають бути провалідовані - для валідації створи у файлі contactsSchemas.js
  // (знаходиться у папці schemas) схему з використанням пакета joi. Якщо передані поля мають не валідне значення,
  //  повертає json формату {"message": error.message} (де error.message - змістовне повідомлення з суттю помилки) зі статусом 400
  //   Якщо з body все добре, викликає функцію-сервіс updateContact, яку слід створити в файлі contactsServices.js
  //  (знаходиться в папці services). Ця функція має приймати id контакта, що підлягає оновленню, та дані з body, і оновити контакт
  // у json-файлі contacts.json
  //   За результатом роботи функції повертає оновлений об'єкт контакту зі статусом 200.
  //   Якщо контакт за id не знайдено, повертає json формату { "message": "Not found" } зі статусом 404

  const { id } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    throw HttpError(400, "Body must have at least one field");
  }

  const result = await contactsService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};
