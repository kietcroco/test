//const fs = require("fs-extra");
const path = require("path");
//const ncp = require("ncp").ncp;
const spawnSync = require('child_process').spawnSync;
var fs;
var ncp;

// thư mục hiện tại
const thePath = __dirname;

// đường dẫn thư mục install
const installFolderName = "install";

// thư mục install
const folderCustomNodeModule = `${installFolderName}/node_modules`;

// thư mục đích
const newFolder = "node_modules";

// config spawn
const spawnOpts = {
	cwd: process.cwd(),
    env: process.env,
	//stdio: 'inherit',
	stdio: 'pipe',
	stdin: 'inherit',
	shell: true,
	encoding: "utf-8"
};

// hàm link native
const link = () => {

	// đọc các file package.json trong thư mục install
	readNodeModule( folderCustomNodeModule, content => {

		// parse json
		content = JSON.parse( content );

		console.log(`link package ${content.name}`);

		// excute lệnh react-native link (rnpm link [name])
		const res = spawnSync("rnpm", ['link', content.name], spawnOpts);

		// nếu thành công exit process
		if (res.status) {

			process.exit(res.status);
		}
	}, err => console.error(err));

	// đường dẫn file build.gradle trong androind
	const buildGradlePath = path.resolve(thePath, './android/app/build.gradle');

	// text link native configs.gradle trong install
	const gradleLink = `\napply from: "../../${installFolderName}/configs.gradle"`;

	// nếu tồn tại file build.gradle
	if( fs.existsSync( buildGradlePath ) ) {
		
		// đọc nội dung file build.gradle
		var buildGradleContents = fs.readFileSync(buildGradlePath, "utf8");

		// kiểm tra đã tồn tại gradleLink trong file
		if (~buildGradleContents.indexOf(gradleLink)) {

			console.log('link configs.gradle is already');
		} else {

			// tìm đoạn react.gradle
			var buildGradleLink = buildGradleContents.match(/\n?apply from: ["'].*?react\.gradle["']/)[0];

			// thay thế đoạn đó thành react.gradle + configs.gradle
			buildGradleContents = buildGradleContents.replace(buildGradleLink,
				`${buildGradleLink}${gradleLink}`);
			
			// ghi file
			fs.writeFileSync(buildGradlePath, buildGradleContents);
			console.log('link configs.gradle is already');
		}
	}
};

// hàm đọc thư mục temp node
const readNodeModule = (dirname, onFileContent, onError) => {

	try {

		// đọc thư mục install/node_modules
		const dirnames = fs.readdirSync( dirname );

		// nếu có tồn tại thư mục nào bên trong thì duyệt tiếp
		dirnames && dirnames.length && dirnames.forEach( subdirname => {

			console.log(`find package.json from ${subdirname}`);

			// đọc thư mục con của install/node_modules
			const filenames = fs.readdirSync( path.join(dirname, subdirname) );

			// nếu có file thì duyệt
			filenames && filenames.length && filenames.forEach( filename => {

				// nếu tên file = package.json
				if( filename === "package.json" ) {

					const pathCustomNode = path.join(dirname, subdirname, filename);
					console.log(`read package.json from ${pathCustomNode}`);

					// đọc nội dung file
					const content = fs.readFileSync( pathCustomNode, 'utf-8');

					// gọi callBack
					onFileContent(content);
				}
			} );
		} );
	} catch( e ) {

		// báo lỗi
		onError && onError( e );
	}
};

// hàm bổ sung các thư mục, file cần bỏ qua
const ignore = () => {

	// đường dẫn file .flowconfig
	const flowconfigPath = path.resolve(thePath, '.flowconfig');

	// nội dung cần chèn
	const ignoreContent = `${installFolderName}/**\ninstall.window.js\n*.window.js\n`;

	// nếu tồn tại file .flowconfig
	if( fs.existsSync( flowconfigPath ) ) {

		// đọc nội dung file .flowconfig
		var flowconfigContents = fs.readFileSync(flowconfigPath, "utf8");

		// kiểm tra tồn tại nội dung cần chèn
		if (~flowconfigContents.indexOf(ignoreContent)) {

			console.log('ignore .flowconfig is already');
		} else {

			// lấy đoạn [ignore]
			var flowconfigLink = flowconfigContents.match(/\[ignore\]/)[0];

			// thay thế bằng [ignore] + nội dung cần chèn
			flowconfigContents = flowconfigContents.replace(flowconfigLink,
				`${flowconfigLink}\n${ignoreContent}`);
			
			// ghi file
			fs.writeFileSync(flowconfigPath, flowconfigContents);
			console.log('ignore .flowconfig is already');
		}
	}
};

// hàm xử lý file proguard-rules.pro
const importProguard = () => {

	const proguardInstallPath = path.resolve(thePath, `./${installFolderName}/proguard-rules.pro`);
	const proguardAndroidPath = path.resolve(thePath, `./android/app/proguard-rules.pro`);

	// nếu tồn tại file proguard-rules.pro
	if( fs.existsSync( proguardInstallPath ) && fs.existsSync( proguardAndroidPath ) ) {

		var proguardInstallContents = fs.readFileSync(proguardInstallPath, "utf8");
		var proguardAndroidContents = fs.readFileSync(proguardAndroidPath, "utf8");

		if( ~proguardAndroidContents.indexOf(proguardInstallContents) ) {

			console.log('proguard-rules.pro is already');
		} else {

			proguardAndroidContents = `${ proguardAndroidContents }${ proguardInstallContents }`;

			// ghi file
			fs.writeFileSync(proguardAndroidPath, proguardAndroidContents);
			console.log('proguard-rules.pro is already');
		}
	}
};

// hàm kiểm tra package đã được install
const isPackageInstalled = ( packageName ) => {
	
	console.log(`detect install package ${packageName}`);

	var version = false;
	const res = spawnSync("npm", ['view', packageName, "version"], spawnOpts);
	if (res.status) {

		process.exit(res.status);
	}
	version = res.output && res.output[1];
	if( typeof version === "string" ) {

		version = version.match(/[\d\.]+/);
		if( version ) {

			console.log(`package ${packageName} is install`);
			return version[0];
		}
		version = false;
	}
	return version;
};

// hàm install package
const installPackage = ( packageName, isGlobal = false, isDev = true ) => {

	console.log(`install package ${packageName} to ${ isGlobal ? "global" : "project" }`);

	const commandText = `install ${ isDev ? "--save-dev" : "--save" }${isGlobal ? " -g" : ""} ${packageName}`;
	const res = pawnSync("npm", commandText.split(" "), spawnOpts);
	if (res.status) {

		process.exit(res.status);
	}
};

// cài đặt các gói package cần thiết
const instalDevPackage = () => {

	if( !isPackageInstalled("ncp") ) {

		installPackage("ncp", false, true);
	}

	if( !isPackageInstalled("immutable") ) {

		installPackage("immutable", false, true);
	}

	if( !isPackageInstalled("fs-extra") ) {

		installPackage("fs-extra", false, true);
	}

	if( !isPackageInstalled("rnpm") ) {

		installPackage("rnpm", true, true);
	}

	ncp = require("ncp").ncp;
	fs = require("fs-extra");
	
	// No limit
	ncp.limit = 0;
};

// hàm require package dòng "install": "node install.window",
const requireInPackage = () => {
	
	const packagePath = path.resolve(thePath, './package.json');

	// nếu tồn tại file package.json
	if( fs.existsSync( packagePath ) ) {

		// đọc nội dung file package.json
		var packageContents = fs.readFileSync(packagePath, "utf8");
		var regexInstall = /["']install["'](?:\s+)?:(?:\s+)?["'](?:\s+)?node\s+install\.window(?:\s+)?["']/;

		// kiểm tra tồn tại nội dung cần chèn
		if ( regexInstall.test( packageContents ) ) {

			console.log('required package.json node install');
			return;
		}

		regexInstall = /(["']install["'](?:\s+)?:(?:\s+)?["'].*)(["'])/;
		if( regexInstall.test( packageContents ) ) {

			packageContents = packageContents.replace( regexInstall, "$1 && node install.window$2" );
		} else {
			
			packageContents = packageContents.replace(/(["']scripts['"](?:\s+)?:(?:\s+)?{)/, `$1\n\t"install": "node install.window",`);
		}

		// ghi file
		fs.writeFileSync(packagePath, packageContents);
		console.log('required package.json node install');
	}
};

// hàm copy file
const copyCustomFile = () => {

	// copy file .npmignore
	fs.copySync(path.resolve(thePath, `./${installFolderName}/.npmignore`), path.resolve(thePath, './.npmignore'));
	console.log('copied .npmignore');
};

// hàm copy custom node module vào node module
const installCustomNode = () => {

	// copy install/node_modules sang node_modules
	ncp( path.join(thePath, folderCustomNodeModule), path.join(thePath, newFolder), (err) => {

		if (err) {

			return console.error(err);
		}
		console.log("Copy custom node_modules !");

		// link native
		link();
	});
};


// thực thi install

// cài đặt package cần thiết
instalDevPackage();

// check package.json
requireInPackage();

importProguard();

// copy file
copyCustomFile();

// copy node module
installCustomNode();

// config bỏ qua file
ignore();