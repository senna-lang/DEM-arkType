import { type } from "arktype";

const registerForm = type({
  username: "string < 280",
  email: "string.email",
  password: "string.digits < 6",
});

type RegisterForm = typeof registerForm.infer;

const formData: RegisterForm = {
  username: "test",
  email: "test@test.com",
  password: "12345",
};

const jsonData = JSON.stringify(formData);
const parseJson = type("string").pipe(str => JSON.parse(str));

const parsedData = registerForm(formData);
const parsedJsonData = registerForm(parseJson(jsonData));

// パースエラーをキャッチする
if (parsedData instanceof type.errors) {
  console.error(parsedData.summary);
  parsedData.throw(); // 例外はこれでthrowできる
} else {
  console.log("オブジェクトの構造は意図通りです！");
}

if (parsedJsonData instanceof type.errors) {
  console.error(parsedJsonData.summary);
} else {
  console.log("JSONの構造も意図通りです！");
}

// スキーマ構造を自然言語で出力してくれる
console.log(registerForm.description);
