
import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// Khởi tạo một đối tượng trelloDatabaseInstance ban đầu là null (vì chưa connect)
let trelloDatabaseInstance = null

// Khởi tạo một đối tượng mongoClientInstance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  /*
        Lưu ý: serverApi có từ phiên bản MongoDB 5.0.0 trở lên, có thể ko cần dùng, nếu dùng chúng ta sẽ chỉ định một cái Stable API Version của MongoDB
        // Đọc thêm: https://www.mongodb.com/docs/drivers/node/current/fundamentals/stable-api/
    */
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// Kết nối tới database
export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()
  /* Kết nối thành công thì lấy ra Database theo tên và gắn
        ngược lại biến trelloDatabaseInstance ở bên trên.
    */
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

/* Đóng kết nối tới database khi cần */
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

/*
    - Function GET_DB  (ko async) này có nhiệm vụ export ra cái trello Database Instance
    sau khi đã connect thành công tới MongoDB để chúng ta có thể sử dụng nhiều nơi khác trong code.
    - Lưu ý phải đảm bảo chỉ luôn gọi GET_DB này sau khi kết nối thành công đến MongoDB
*/
export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}
