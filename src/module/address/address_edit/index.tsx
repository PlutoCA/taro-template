import Taro, { useState, useEffect, useRouter } from "@tarojs/taro";
import { View, Picker } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
// import useForm from "../../../hooks/u_form";
import "./index.scss";

type FormType = {
  nickname: string
  phone: string
  place: string[]
  detail: string
};

export default function AddressEdit() {
  const router = useRouter();

  const [form, setForm] = useState<FormType>({
    nickname: '',
    detail: '',
    place: [],
    phone: '',
  });

  const getDetail = (id: string) => {
    Taro.showLoading({
      title: "加载中~",
    });
  };

  useEffect(() => {
    if (+router.params.id) {
      getDetail(router.params.id);
    } else {
      const data = Taro.getStorageSync('userData');
      if (data.mobile) {
        setForm({
          ...form,
          phone: data.mobile,
        });
      }
    }
  }, [router.params.id]);

  const handleChange = (e, name) => {
    console.log(e, name);
    form[name] = e;
    setForm({ ...form });
  };

  // 参数调整
  const changePlaceValue = (data : any) => {
    const copyForm = {
      ...data,
      province: data.place[0],
      city: data.place[1],
      area: data.place[2],
      consignee: data.nickname,
      mobile: data.phone,
      id: +router.params.id,
    };
    delete copyForm.street;
    return copyForm;
  };

  const editAddress = (address : any) => {
    const pages = Taro.getCurrentPages();
    const prevPage = pages[pages.length - 2];
    // 判断是否特定页面来的 返回上一页
    if (prevPage.route.indexOf('confirm_order') !== -1 || prevPage.route.indexOf('sale') !== -1) {
      Taro.setStorage({
        key: "ChooseAddress",
        data: address,
      });
      prevPage.$component.setState({
        address: {
          ...address,
          address: address.place.join('') + address.detail,
          // keyData: String(new Date().getTime())
        },
      }, () => {
        Taro.navigateBack({
          delta: 1,
        });
      });
    } else {
      Taro.navigateBack({
        delta: -1,
      });
    }
  };

  const onSubmit = async () => {
    const submitDate = changePlaceValue(form);
    console.log(submitDate);
  };

  return (
    <View>
      <AtForm
        onSubmit={onSubmit}
        className='address_form'
      >
        <AtInput
          name='nickname'
          type='text'
          title='收件人'
          onChange={e => handleChange(e, "nickname")}
          placeholder='请填写'
          border
          value={form.nickname}
          maxLength={10}
        />
        <AtInput
          name='phone'
          type='phone'
          title='手机号'
          onChange={e => handleChange(e, 'phone')}
          placeholder='请填写'
          border
          value={form.phone}
        />

        <Picker
          mode='region'
          value={[]}
          onChange={e => handleChange(e.detail.value, 'place')}
        >
          <AtInput
            name='place'
            type='text'
            title='省市区'
            onChange={() => { }}
            border
            placeholder='请填写'
            disabled
            value={form.place.length ? `${form.place[0]}-${form.place[1]}-${form.place[2]}` : ''}
          />
        </Picker>
        <AtInput
          name='detail'
          type='text'
          title='详细地址'
          onChange={e => handleChange(e, 'detail')}
          placeholder='请填写'
          border={false}
          value={form.detail}
          maxLength={20}
        />
        <AtButton className='submit_btn' formType='submit'>提交</AtButton>
      </AtForm>
    </View>
  );
}

AddressEdit.config = {
  navigationBarTitleText: "编辑地址",
};
