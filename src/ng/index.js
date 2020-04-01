function getPageType () {
  if (/ks\.wjx\.top\/wjx\/join\/uploadMultiple/.test(location.href)) return 3
  if (/ks\.wjx\.top\/wjx\/join\/JoinActivityRank/.test(location.href)) return 4
  if (/(ks\.wjx\.top|www\.wjx\.cn)\/jq\//.test(location.href)) return 1
  if (/(ks\.wjx\.top|www\.wjx\.cn)\/wjx\/join\//.test(location.href)) return 2
}

if (/^http:\/\//.test(location.href)) {
  location.href = location.href.replace(/http/, 'https')
}

if (/wjx\.(top|cn)\/m\//.test(location.href)) {
  location.href = location.href.replace(/\/m\//, '/jq/')
}

switch (getPageType()) {
  case 1:
    require('./ks')
    break
}

[...document.querySelectorAll('span')]
  .filter(x => /lblpowerby/i.test(x.id))
  .forEach(x => {
    x.innerHTML =
      '<a href="https://djx.zhangzisu.cn/" target="_blank" class="link-444" title="答卷星_不止问卷填写/自动考试">答卷星</a>&nbsp;提供技术支持'
  })
