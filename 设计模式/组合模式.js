// https://fanerge.github.io/2017/js%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E7%BB%84%E5%90%88%E6%A8%A1%E5%BC%8F.html
// 定义：组合模式（Composite）将对象组合成树形结构以表示“部分-整体”的层次结构，组合模式使得用户对单个对象和组合对象的使用具有一致性。


// 定义组合对象（文件夹）
let Folder = function(name) {
  this.name = name
  this.files = []
}

Folder.prototype.add = function(file) {
  this.files.push(file)
}

Folder.prototype.scan = function() {
  console.log('开始文件扫描:' + this.name)
	for( let i = 0, file, files = this.files; file = files[i++]; ){
		file.scan();
	}
} 

//定义叶子对象（文件）
let File = function(name) {
  this.name = name
}

File.prototype.add = function() {
  throw new Error('文件下面不能再添加文件')
}
File.prototype.scan = function() {
  console.log('开始扫瞄：' + this.name)
}


let folder = new Folder('前端学习');
let folder1 = new Folder('JS学习');
let folder2 = new Folder('JQ学习');

let file1 = new File('JS设计模式');
let file2 = new File('JQ实战');
let file3 = new File('前端性能');

folder1.add(file1);
folder2.add(file2);

folder.add(folder1);
folder.add(folder2);
folder.add(file3);
folder.scan();

// 开始文件扫描:前端学习
// 开始文件扫描:JS学习
// 开始扫瞄：JS设计模式
// 开始文件扫描:JQ学习
// 开始扫瞄：JQ实战
// 开始扫瞄：前端性能