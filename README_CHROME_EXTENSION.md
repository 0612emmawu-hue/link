# Chrome 扩展打包指南

## 构建扩展

1. 运行构建命令：
```bash
npm run build
```

2. 构建完成后，`dist` 文件夹将包含所有扩展文件

## 在 Chrome 中加载扩展

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目的 `dist` 文件夹

## 上传到 Chrome Web Store

1. 将 `dist` 文件夹压缩成 ZIP 文件
2. 访问 [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
3. 点击"新增项目"
4. 上传 ZIP 文件
5. 填写商店详情信息：
   - 详细描述
   - 屏幕截图（至少1张，建议5张）
   - 宣传图片（可选）
   - 小图标（128x128）
6. 提交审核

## 注意事项

- 需要准备高质量的图标（16x16, 48x48, 128x128）
- 准备扩展的截图和宣传素材
- 首次发布需要支付一次性5美元开发者注册费
- 审核通常需要几个工作日

## 图标建议

目前使用的是 favicon.ico，建议准备以下尺寸的图标：
- 16x16 像素
- 48x48 像素
- 128x128 像素

可以使用在线工具生成不同尺寸的图标。
