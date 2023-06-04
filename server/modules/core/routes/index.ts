import { Router } from 'express'
import  postController from "../controllers/post"
import userController from "../controllers/user"
import categoryController from "../controllers/category"
import tagController from "../controllers/tag"
import linkController from "../controllers/link"

const router:any = Router()

// 用户路由
router.post("/user/new", userController.create);
router.get("/user/:name", userController.getByname);
router.put("/user/:name", userController.update);
router.delete("/user/:name", userController.delete);

// links路由
router.get("/links", linkController.list)
router.post("/links", linkController.create);
router.get("/links/:id", linkController.getById);
router.put("/links/:id", linkController.update);
router.delete("/links/:id", linkController.delete);
router.post("/category/link/", linkController.listByCategory)


// post路由
router.post("/posts", postController.create);
router.get("/posts", postController.list);
router.get("/posts/:id", postController.getById);
router.put("/posts/:id", postController.update);
router.delete("/posts/:id", postController.delete);
router.post("/category/post/", postController.listByCategory)

// 分类路由
router.post("/category/new", categoryController.create);
router.get("/category/list", categoryController.list);
router.get("/category/list/:num", categoryController.listByGroup);
// router.get("/posts/:id", categoryController.getById);
router.put("/category/:id", categoryController.update);
// router.delete("/posts/:id", categoryController.delete);

// 标签路由
router.post("/tag/new", tagController.create);
router.get("/tag/list", tagController.list);
router.put("/tag/:id", tagController.update);

export default router
