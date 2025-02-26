// 全局变量存储上传的图片路径
let images = [];

// 获取DOM元素
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');
const imageList = document.getElementById('image-list');

// 为拖拽区域添加事件监听器
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('highlight');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('highlight');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

// 点击拖拽区域触发文件选择
dropArea.addEventListener('click', () => {
    fileInput.click();
});

// 监听文件选择
fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// 处理上传的文件
function handleFiles(files) {
    for (let file of files) {
        if (!file.type.match('image.*')) {
            alert('请只上传图片文件！');
            continue;
        }
        
        const formData = new FormData();
        formData.append('file', file);
        
        fetch('/upload', { 
            method: 'POST', 
            body: formData 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('上传失败');
            }
            return response.text();
        })
        .then(path => {
            images.push(path);
            updateImageList();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('上传失败: ' + error.message);
        });
    }
}

// 初始化Sortable
let sortable;

// 更新图片列表显示
function updateImageList() {
    imageList.innerHTML = '';
    
    // 创建图片元素
    images.forEach((path, index) => {
        const li = document.createElement('li');
        li.classList.add('image-item');
        li.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = path;
        img.alt = `图片 ${index + 1}`;
        
        li.appendChild(img);
        imageList.appendChild(li);
    });
    
    // 如果存在旧的Sortable实例，先销毁
    if (sortable) {
        sortable.destroy();
    }
    
    // 初始化Sortable
    sortable = new Sortable(imageList, {
        animation: 150,                // 动画速度（毫秒）
        ghostClass: 'image-item-placeholder', // 放置占位符的类名
        chosenClass: 'dragging',       // 被选中项的类名
        dragClass: 'dragging',         // 拖动时的类名
        onEnd: function(evt) {
            // 拖拽结束后更新images数组
            const oldIndex = evt.oldIndex;
            const newIndex = evt.newIndex;
            
            if (oldIndex !== newIndex) {
                const [moved] = images.splice(oldIndex, 1);
                images.splice(newIndex, 0, moved);
            }
        }
    });
}

// 生成长图
function generate() {
    if (images.length === 0) {
        alert('请先上传图片！');
        return;
    }
    
    fetch('/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: images })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('生成失败');
        }
        // 检查响应的Content-Type来确定文件类型
        const contentType = response.headers.get('Content-Type');
        const fileExt = contentType.includes('png') ? 'png' : 'jpg';
        return response.blob().then(blob => ({ blob, fileExt }));
    })
    .then(({ blob, fileExt }) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `combined_image.${fileExt}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('生成失败: ' + error.message);
    });
} 