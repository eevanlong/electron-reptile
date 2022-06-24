export interface IParams {
  /**
   * 抓取内容实体
   */
  contents: Content[];
  /**
   * 存文件名称 如果保存是文本文件 此处必填
   */
  fileName: string;
  /**
   * 保存文件地址 填写绝对地址
   */
  filePath: string;
  /**
   * 是否开启延迟加载，开启延迟加载可以处理网页懒加载的数据    *   注意开启延迟加载 会影响爬取效率
   */
  isLazyLoading: boolean;
  /**
   * 当前抓取页面 是否是列表
   */
  isList: boolean;
  /**
   * 表头选择器，如果抓取列表 需要设置此选择器 只能css选择器
   */
  listSelector: string;
  /**
   * 列表每行的标签，如 ul > li 此处应该填 li
   */
  listTagName: string;
  /**
   * 下一页选择器，获取抓取下一页 为空则只抓取当前页面 只能css选择器
   */
  nextSelector: string;
  /**
   * 抓取URL
   */
  url: string;
}

export interface IContent {
  /**
   * 保存类型:1-txt,2-html富文本,3-图片文件
   */
  saveType: number;
  /**
   * 选择器
   */
  selector: string;
  /**
   * 选择器类型 1-css选择器 2-xpath选择器
   */
  type: number;
}
