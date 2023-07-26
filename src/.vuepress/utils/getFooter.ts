const langMap = {
	en : {
		resource: 'Resources',
		roadmap: {
			name: 'Roadmap',
			link: '/guide/versions/roadmap.html'
		},
		devGuide: {
			name: 'Development Guide',
			link: '/dev-guide/get_started/build_source_code.html'
		},
		blog: 'Blog',
		support: 'Support',
		forum: 'Forum',
		contactUs: 'Contact Us',
		company: 'Company',
		aboutUs: 'About Us',
		news: 'News',
		research: 'Research',
		academicCoop: 'Academic Coop',
		careers: 'Careers'
	},
	zh:{
		resource: '资源',
		roadmap: {
			name: '路线图',
			link: '/zh/guide/versions/roadmap.html'
		},
		devGuide: {
			name: '开发者手册',
			link: '/zh/dev-guide/get_started/build_source_code.html'
		},
		blog: '博客',
		support: '支持',
		forum: '社区',
		contactUs: '联系我们',
		company: '公司',
		aboutUs: '关于我们',
		news: '新闻',
		research: '研究方向',
		academicCoop: '学术合作',
		careers: '加入我们'
	}
}

export const getFooter = (lang = 'en') => {
  	return `
		<footer id="custom-footer">
			<div class="content">
				<div class="media-link">
					<div class="logo">
						<img src="/images/logo.png" />
						<div>openGemini</div>
					</div>
					<div class="links">   
						<a class="icon iconfont" href="https://github.com/openGemini" target="_blank">&#xe600;</a>
						<a class="icon iconfont" href="https://join.slack.com/t/opengemini/shared_invite/zt-206txnqpc-UhWMF7DGXT3PLi~dr2Yd1Q" target="_blank">&#xe71b;</a>
						<a class="icon iconfont" href="https://twitter.com/OpenGemini" target="_blank">&#xe882;</a>
					</div>
				</div>
				<div class="link-text">
					<div class="title">${langMap[lang].resource}</div>
					<a href="${langMap[lang].roadmap.link}">openGemini ${langMap[lang].roadmap.name}</a>
					<a href="${langMap[lang].devGuide.link}">${langMap[lang].devGuide.name}</a>
					<a href="http://www.opengemini.org/blog" target="_blank">${langMap[lang].blog}</a>
				</div>
				<div class="link-text">
					<div class="title">${langMap[lang].support}</div>
					<a href="http://www.opengemini.org/events" target="_blank">${langMap[lang].forum}</a>
					<a href="https://jinshuju.net/f/V8sdbq" target="_blank">${langMap[lang].contactUs}</a>
				</div>
				<div class="link-text">
					<div class="title">${langMap[lang].company}</div>
					<a href="https://www.huaweicloud.com/lab/clouddb/about.html" target="_blank">${langMap[lang].aboutUs}</a>
					<a href="https://www.huaweicloud.com/lab/clouddb/news.html" target="_blank">${langMap[lang].news}</a>
					<a href="https://www.huaweicloud.com/lab/clouddb/research.html" target="_blank">${langMap[lang].research}</a>
					<a href="https://www.huaweicloud.com/lab/clouddb/academic_coop.html" target="_blank">${langMap[lang].academicCoop}</a>
					<a href="https://www.huaweicloud.com/lab/clouddb/career.html" target="_blank">${langMap[lang].careers}</a>
				</div>
			</div>
		</footer>`
}
