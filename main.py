from flask import Flask, render_template, request, send_file, url_for
from PIL import Image
import os
import uuid

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# 添加静态文件访问路径
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_file(os.path.join(app.config['UPLOAD_FOLDER'], filename))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file:
        # 生成随机文件名，保留原始扩展名
        file_ext = os.path.splitext(file.filename)[1]
        random_filename = f"{uuid.uuid4().hex}{file_ext}"
        
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], random_filename)
        file.save(filepath)
        
        # 返回可访问的URL而不是文件路径
        file_url = url_for('uploaded_file', filename=random_filename)
        return file_url, 200

@app.route('/generate', methods=['POST'])
def generate_image():
    data = request.get_json()
    image_urls = data['images']
    
    # 将URL转换回文件路径
    image_paths = []
    for url in image_urls:
        # 从URL中提取文件名
        filename = url.split('/')[-1]
        # 获取完整文件路径
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image_paths.append(filepath)
    
    # 加载图片，找到最小宽度
    images = [Image.open(path) for path in image_paths]
    # 保存原始图片的模式
    img_modes = [img.mode for img in images]
    
    # 确保所有图片使用相同的模式进行处理
    # 优先使用RGBA模式保留透明度，如果都是RGB则使用RGB
    if any(mode == 'RGBA' for mode in img_modes):
        process_mode = 'RGBA'
        save_format = 'PNG'
        # 转换所有图片到RGBA
        images = [img.convert('RGBA') for img in images]
    else:
        process_mode = 'RGB'
        save_format = 'JPEG'
        # 转换所有图片到RGB
        images = [img.convert('RGB') for img in images]
    
    widths, heights = zip(*(i.size for i in images))
    min_width = min(widths)
    
    # 缩放所有图片到最小宽度，保持比例，使用高质量重采样
    resized_images = [img.resize((min_width, int(height * min_width / width)), 
                                 Image.LANCZOS) 
                     for img, width, height in zip(images, widths, heights)]
    
    # 计算总高度
    total_height = sum(img.size[1] for img in resized_images)
    
    # 创建新图像，垂直拼接
    new_image = Image.new(process_mode, (min_width, total_height))
    y_offset = 0
    for img in resized_images:
        new_image.paste(img, (0, y_offset))
        y_offset += img.size[1]
    
    # 保存并返回下载
    if save_format == 'JPEG':
        output_path = os.path.join(app.config['UPLOAD_FOLDER'], 'output.jpg')
        new_image.save(output_path, format='JPEG', quality=95, subsampling=0)
        mimetype = 'image/jpeg'
    else:
        output_path = os.path.join(app.config['UPLOAD_FOLDER'], 'output.png')
        new_image.save(output_path, format='PNG')
        mimetype = 'image/png'
    
    return send_file(output_path, as_attachment=True, mimetype=mimetype)

if __name__ == '__main__':
    app.run(debug=True) 