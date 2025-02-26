# 图片拼接工具 | Image Stitching Tool

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.8+-blue.svg" alt="Python Version">
  <img src="https://img.shields.io/badge/Flask-2.0+-green.svg" alt="Flask Version">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
</p>

[English](#english) | [中文](#chinese)

<a id="chinese"></a>
## 中文介绍

### 项目概述

Image Stitching Tool 是一个基于 Flask 的轻量级 Web 工具，用于快速创建长图，特别适合垂直拼接多张截图或照片。通过简单的拖拽界面，用户可以轻松上传图片，调整顺序，并一键生成拼接后的长图。

### 主要功能

- **直观的拖拽上传**：支持多文件拖拽上传或选择文件上传
- **灵活的排序功能**：通过拖拽轻松调整图片的排列顺序
- **自动图片处理**：自动调整图片宽度至一致，保持纵横比例
- **一键生成下载**：即时生成长图并自动下载到本地

### 技术栈

- **后端**：Flask (Python Web框架)
- **图像处理**：Pillow (Python图像库)
- **前端**：HTML5、CSS、JavaScript、Sortable.js (拖拽排序库)

### 安装与使用

1. 克隆仓库到本地
   ```bash
   git clone https://github.com/yourusername/pinjiephoto.git
   cd pinjiephoto
   ```

2. 创建并激活虚拟环境
   ```bash
   python -m venv venv
   source venv/bin/activate  # macOS/Linux
   # 或
   venv\Scripts\activate  # Windows
   ```

3. 安装依赖
   ```bash
   pip install -r requirements.txt
   ```

4. 运行应用
   ```bash
   python main.py
   ```

5. 浏览器访问
   ```
   http://127.0.0.1:5000
   ```

### 使用提示

- 支持常见图片格式如JPG、PNG、GIF等
- 生成长图的宽度将基于所有图片的最小宽度
- 其他图片会按比例缩放以保持原有比例
- 图片暂存在本地uploads目录，定期清理可释放空间

<a id="english"></a>
## English

### Project Overview

PinjiePhoto is a lightweight Flask-based web tool for quickly creating long vertical images, perfect for stitching together screenshots or photos. Through a simple drag-and-drop interface, users can easily upload images, adjust their order, and generate a combined image with one click.

### Key Features

- **Intuitive Drag & Drop Upload**: Support for multiple file uploads via drag and drop or file selection
- **Flexible Image Ordering**: Easily arrange images in any order through drag and drop
- **Automatic Image Processing**: Images are automatically resized to a consistent width while maintaining aspect ratio
- **One-Click Generation**: Instantly generate and download the combined image

### Tech Stack

- **Backend**: Flask (Python Web Framework)
- **Image Processing**: Pillow (Python Imaging Library)
- **Frontend**: HTML5, CSS, JavaScript, Sortable.js (Drag and Drop library)

### Installation and Usage

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/pinjiephoto.git
   cd pinjiephoto
   ```

2. Create and activate a virtual environment
   ```bash
   python -m venv venv
   source venv/bin/activate  # macOS/Linux
   # or
   venv\Scripts\activate  # Windows
   ```

3. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

4. Run the application
   ```bash
   python main.py
   ```

5. Access in browser
   ```
   http://127.0.0.1:5000
   ```

### Usage Tips

- Supports common image formats such as JPG, PNG, GIF, etc.
- The width of the generated image will be based on the smallest width among all images
- Other images will be scaled proportionally to maintain their original aspect ratio
- Images are temporarily stored in the local uploads directory; periodic cleanup can free up space

## License | 许可证

This project is licensed under the MIT License - see the LICENSE file for details.

本项目采用 MIT 许可证 - 查看 LICENSE 文件了解详情。

```
MIT License

Copyright (c) 2025 PinjiePhoto Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.