var LuckVipsoft = {}
LuckVipsoft.http = "http://192.168.0.13:8088"
//LuckVipsoft.http = "http://192.168.0.111"
LuckVipsoft.api = {
    /* 登录、注册*/
    retrievePasswordSendCode: '/api/GeneralInterface/RetrievePasswordSendCode', //发送验证码
    retrievePassword: '/api/GeneralInterface/RetrievePassword',  //修改密码
    login: '/api/GeneralInterface/Login',//登录
    CheckValidationCode: "/api/GeneralInterface/CheckValidationCode",//验证短信码

    /*初始化*/
    getShopList: '/api/GeneralInterface/GetShopList',//获取店铺信息(用于绑定)
    getStaffClassList: '/api/GeneralInterface/GetStaffClassList',//获取员工分类数据(用于绑定)
    getStaffList: '/api/GeneralInterface/GetStaffList', //获取提成员工数据(用于绑定)
    BindMemLevelList: '/api/GeneralInterface/BindMemLevelList',//获取等级信息
    GetSysArgument: '/api/GeneralInterface/GetSysArgument',//获取系统参数
    GetCustomFieldList: '/api/GeneralInterface/GetCustomFieldList',//自定义字段获取
    /*主页*/
    SaveShiftTurnOverData: '/api/GeneralInterface/SaveShiftTurnOverData',//保存交班数据
    SaveUserFeedBackData: '/api/GeneralInterface/SaveUserFeedBackData',//提交意见反馈
    GetShiftTurnOverData:'/api/GeneralInterface/GetShiftTurnOverData',//获取交班数

    /*优惠 */
    GetConponListPage: '/api/GeneralInterface/GetConponListPage',//获取优惠券列表分页数据
    SaveConponData: '/api/GeneralInterface/SaveConponData',//保存优惠券数据
    getActivityList: '/api/GeneralInterface/BindActivityListSelect', //获取优惠活动数据
    DeleteConpon: '/api/GeneralInterface/DeleteConpon',//删除优惠活动
    SaveClassDiscountRulesList: '/api/GeneralInterface/SaveClassDiscountRulesList',//保存特殊折扣

    /*单据管理 */
    TopUp: '/api/GeneralInterface/TopUp',// 会员充值
    GetTopUpOrderByPaged: '/api/GeneralInterface/GetTopUpOrderByPaged',//单据管理-会员充值
    GetTopUpOrderByDetail: '/api/GeneralInterface/GetTopUpOrderByDetail',//单据管理-充值订单详情
    RevokeTopUpOrder: '/api/GeneralInterface/RevokeTopUpOrder',//充值撤单
    GetRechargeCountOrderByPaged: '/api/GeneralInterface/GetRechargeCountOrderByPaged',  //单据管理-充次订单
    GetRechargeCountOrderByDetail: '/api/GeneralInterface/GetRechargeCountOrderByDetail',// 单据管理-充次订单详情
    RechargeCountOrderRePrint: '/api/GeneralInterface/RechargeCountOrderRePrint',//充次重打印
    RevokeRechargeCountOrder: '/api/GeneralInterface/RevokeRechargeCountOrder',//充次撤单
    GetRedeemOrderByPaged:'/api/GeneralInterface/GetRedeemOrderByPaged', //单据管理-礼品兑换订单
    GetRedeemOrderByDetail:'/api/GeneralInterface/GetRedeemOrderByDetail',//单据管理-礼品兑换订单详情
    RevokeRedeemOrder:'/api/GeneralInterface/RevokeRedeemOrder',//礼品兑换撤单
    RedeemOrderRePrint:'/api/GeneralInterface/RedeemOrderRePrint',//礼品兑换订单 重打印
    GetMallOrderListPage: '/api/GeneralInterface/GetMallOrderListPage',//获取订单列表

    /*卡券核销 */
    GetConponLogListPage: '/api/GeneralInterface/GetConponLogListPage',//根据优惠券ID或者卡号查询优惠券
    WriteOffCoupon: '/api/GeneralInterface/WriteOffCoupon',//优惠券核销



    GetMemLevelByID: '/api/GeneralInterface/GetMemLevelByID',//根据ID获取等级信息
    SaveMemLevel: '/api/GeneralInterface/SaveMemLevel',//保存会员等级信息
    DeleteMemLevel: '/api/GeneralInterface/DeleteMemLevel',//删除会员等级
    GetRecommendedSet: '/api/GeneralInterface/GetRecommendedSet',//获取推荐设置
    SaveRecommendedSet: '/api/GeneralInterface/SaveRecommendedSet',//保存推荐设置
    SearchMemCardList: '/api/GeneralInterface/SearchMemCardList',// 会员信息查询(收银、列表)
    SaveMemberData: '/api/GeneralInterface/SaveMemberData',//保存会员信息
    DeleteMemberData: '/api/GeneralInterface/DeleteMemberData',//删除会员
    MemChangeCardID: '/api/GeneralInterface/MemChangeCardID',//会员换卡
    MemUpdatePassword: '/api/GeneralInterface/MemUpdatePassword',//会员修改密码
    MemPointAdjust: '/api/GeneralInterface/MemPointAdjust',//会员积分调整
    MemLockSet: '/api/GeneralInterface/MemLockSet',//会员绑定/解锁
    GetMemDataByID: '/api/GeneralInterface/GetMemDataByID',// 获取会员详情
    RechargeCount: '/api/GeneralInterface/RechargeCount',//  会员充次
    GetGoodsClassList: '/api/GeneralInterface/GetGoodsClassList', //获取产品分类信息
    SaveMasterData: '/api/GeneralInterface/SaveMasterData',//保存操作员信息
    GetServiceGoodsPage: '/api/GeneralInterface/GetServiceGoodsPage', //获取服务产品分页数据
    GetGoodsByID: '/api/GeneralInterface/GetGoodsByID', //根据产品ID获取产品数据
    GetCashierGoodsListPage: '/api/GeneralInterface/GetCashierGoodsListPage',//获取产品列表分页数据
    SearchMemCardList: '/api/GeneralInterface/SearchMemCardList',//会员信息查询
    GetGoodsListPage: '/api/GeneralInterface/GetGoodsListPage',//获取商品列表分页数据
    SaveGoodsData: '/api/GeneralInterface/SaveGoodsData', //保存商品
    DeleteGoods: '/api/GeneralInterface/DeleteGoods',//删除商品
    GetRechargeCountGoodsListPage: '/api/GeneralInterface/GetRechargeCountGoodsListPage',//获取充次商品分页数据
    GetComboListPage: '/api/GeneralInterface/GetComboListPage',//获取套餐列表
    GetComboData: '/api/GeneralInterface/GetComboData',//获取套餐详情
    SaveComboData: '/api/GeneralInterface/SaveComboData',//保存套餐
	GetGiftInfoPage:'/api/GeneralInterface/GetGiftInfoPage',//获取积分兑换礼品列表
	RedeemGift:'/api/GeneralInterface/RedeemGift',//会员礼品兑换订单提交
    /*操作*/
    UploadImg: '/api/GeneralInterface/UploadImg', //上传图片
    SaveMemberData: '/api/GeneralInterface/SaveMemberData',//保存会员信息


    /*短信 */
    GetSMSMsgTemplateList: '/api/GeneralInterface/GetSMSMsgTemplateList',//模板列表
    SaveSMSMsgTemplate: '/api/GeneralInterface/SaveSMSMsgTemplate',//短信自定义模板（增、改）
    SmsSend: '/api/GeneralInterface/SmsSend',//发送短信

}
LuckVipsoft.lan = {
    ER0000: '系统登录失败',
    ER0001: '登陆失败',
    ER0002: '登录账户不能为空',
    ER0003: '密码不能为空',
    ER0004: '验证码不能为空',
    ER0005: '验证码必须为4位数字',
    ER0006: '企业代码不存在',
    ER0007: '验证码过期',
    ER0008: '登录账户不存在',
    ER0009: '密码不正确',
    ER0010: '验证码不正确',
    ER0011: '系统数据不完整，企业代码对应的总店信息不存在',
    ER0012: '企业信息未初始化,找不到此企业',
    ER0013: '系统数据不完整，操作员所在分店信息不存在',
    ER0014: '手机号码不能为空',
    ER0015: '请输入正确格式的手机号码',
    ER0016: "企业号不能为空",
    ER0017: "密码两次输入不一致",
    ER0018: "上传图片不能为空",
    ER0019: "上传类型错误",
    ER0020: "锁屏密码不能为空",
    ER0021: "搜索内容不能为空",
    ER0022: "请选择会员",
}
