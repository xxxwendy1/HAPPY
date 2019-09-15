
import axios from 'axios'
const port = {
//商品列表页地址
	shopadress(){ 
		return new Promise((resolve,reject) => {
			axios({
				url:'http://cangdu.org:8001/v1/cities?type=guess',
				mothod:'get',
			}).then( res => {
				return resolve(res)
			})
		})

	},

	//http://cangdu.org:8001/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset=0&limit=20
	shoplist(shopdata){
		console.log(shopdata)
		return new Promise((resolve,reject) => {
			axios({
				url: `http://cangdu.org:8001/shopping/restaurants?latitude=${shopdata.latitude}&longitude=${shopdata.longitude}&offset=${shopdata.offset}&limit=${shopdata.limit}`,
				mothod: "get",
			
		  	}).then(res => {
				  return  resolve(res) 
			  })
		})
	},
	shopSubmited(){//提交
		console.log('hbuhb')
		return new Promise((resolve,reject) => {
			axios({
				url:'http://cangdu.org:8001/shopping/updateshop',
				mothod:'post',
			}).then( res => {
				return resolve(res)
			})
		})
	},
	//添加数据   
	//http://cangdu.org:8001/shopping/v2/restaurant/category  //店铺分类
	//http://cangdu.org:8001/v1/cities?type=guess   //当前城市的位置

	addShop(){//添加商铺 
		return new Promise((resolve,reject) => {
			axios({
				url:`http://cangdu.org:8001/shopping/v2/restaurant/category`,
				method:'get',

			}).then(res =>{
				return resolve(res)
			})
		})
	},
	newCity(){
		return new Promise((resolve,reject) => {
			axios({
				url:`http://cangdu.org:8001/v1/cities?type=guess`,
				method:'get',

			}).then(res =>{
				return resolve(res)
			})
		})
	},
	//具体位置  http://cangdu.org:8001/v1/pois?type=search&city_id=3&keyword=昌平
	newdress(e){
		// console.log(e)
		return new Promise((resolve,reject) => {
			axios({
				url:`http://cangdu.org:8001/v1/pois`,
				method:'get',
				params:{
					type:'search',
					city_id:e.id,
					keyword:e.val
				}
			}).then(res =>{
				return resolve(res)
			})
		})
	},
	//提交商铺   https://elm.cangdu.org/shopping/addShop
	// {name: "Wendy", address: "北京市昌平区南环东路36号", latitude: 40.21267, longitude: 116.247455, description: "精品",…}
// activities: [{icon_name: "减", name: "满减优惠", description: "满30减5，满60减8"}]
// address: "北京市昌平区南环东路36号"
// bao: true
// business_license_image: ""
// category: "快餐便当/简餐"
// catering_service_license_image: ""
// delivery_mode: true
// description: "精品"
// endTime: "13:15"
// float_delivery_fee: 5
// float_minimum_order_amount: 20
// image_path: "16b4467efe743131.jpg"
// is_premium: true
// latitude: 40.21267
// longitude: 116.247455
// name: "Wendy"
// new: true
// phone: 152436985236
// piao: true
// promotion_info: ""
// startTime: "05:45"
// zhun: true
	openShop(obj){
		console.log(obj)
		return new Promise(((resolve,reject) => {
			axios({
				url:'http://cangdu.org:8001/shopping/addShop',
				method:'post',
				data:{
					activities: obj.activities,
					address: obj.address,
					bao: true,
					business_license_image: obj.business_license_image,
					category: obj.category,
					catering_service_license_image: obj.catering_service_license_image,
					delivery_mode: true,
					description: obj.description,
					endTime: obj.endTime,
					float_delivery_fee: obj.float_delivery_fee,
					float_minimum_order_amount: obj.float_minimum_order_amount,
					image_path: obj.image_path,
					is_premium: true,
					latitude: 40.21267,
					longitude: 116.247455,
					name:obj.name,
					new: true,
					phone: obj.phone,
					piao: true,
					promotion_info: obj.promotion_info,
					startTime: obj.startTime,
					zhun: true,
				}
			}).then(res => {
				return resolve(res)
			})
		}))	
	},
//添加商品 
	//食品种类	http://cangdu.org:8001/shopping/getcategory/4
	foodName(){
		return new Promise(((resolve,reject) =>{
				axios({
					url:'http://cangdu.org:8001/shopping/getcategory/4',
					method:'get',

				}).then(res =>{
					return resolve(res)
					// console.log(res)
				})
		}))
	},
	//提交
	submit(){
		return new Promise(((resolve,reject) =>{
				axios({
					url:'http://cangdu.org:8001/shopping/getcategory/5',
					method:'get',

				}).then(res =>{
					return resolve(res)
					// console.log(res)
				})
		}))
	},
	addFood(add){
		console.log(add)
		return new Promise(((resolve,reject) =>{
				axios({
					url:'http://cangdu.org:8001/shopping/addfood',
					method:'post',
					data:{
						activity: add.activity,
						attributes:add.attributes,
						description: add.description,
						image_path: add.image_path,
						name: add.name,
						restaurant_id: add.restaurant_id,
						specs: add.specs,
						category_id:add.category_id
					}
				}).then(res =>{
					return resolve(res)
					// console.log(res)
				})
		}))
	},
//食品列表  http://cangdu.org:8001/shopping/v2/foods?offset=0&limit=20&restaurant_id=undefined
	foodList(){
		return new Promise(((resolve,reject) =>{
			axios({
				url:' http://cangdu.org:8001/shopping/v2/foods?offset=0&limit=20&restaurant_id=undefined',
				method:'post',
				data:{
					
				}
			}).then(res =>{
				return resolve(res)
				// console.log(res)
			})
	}))
	}






  
  
}
export default port;