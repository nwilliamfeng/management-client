import React, { Component } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { formHelper, GridTextAreaField } from '../helper'
import { MenuItem, Button, } from '@material-ui/core';
import { GridSwitch,  GridDateTimePickerField, GridTextField, GridSelectField, GridRow } from '../helper'


const validationSchema = Yup.object().shape({
    // platformID: Yup.string().required('平台类型不能为空。'),
    // tagId: Yup.number().notOneOf([0], '请选择任务标签。'),
    //  name: Yup.string().required('任务名称不能为空。'),

    // let schema = yup.object({
    //     isBig: yup.boolean(),
    //     count: yup.number().when('isBig', (isBig, schema) => {
    //       return isBig ? schema.min(5) : schema.min(0);
    //     }),
    //   });
})

const fieldStyles = {
    firstColumn: { width: 200 },
}

export class Gift extends Component {

    constructor(props) {
        super(props);
        const { gift, onCommit, giftTypes } = props;
        formHelper.setDateFormat(gift,['beginTime','endTime','expireTime']);
        this.state = {
            gift,
            companys: [{ name: '其他', value: '000' }, { name: '东方财富', value: '001' }, { name: '天天基金', value: '003' }, { name: '基金公司活动', value: '004' }, { name: '基金公司天天基金联合活动', value: '005' },],
            payTypes: [{ name: '不限', value: 0 }, { name: '银行卡支付', value: 1 }, { name: '活期宝支付', value: 2 },],
            supportTypes: [{ name: '用户兑换', value: 1 }, { name: '系统发放', value: 2 }],
            onCommit,
            giftTypes,
        };
    }

    onPropertyChange = e => {
        let gift = { ...this.state.gift };
        this.setState({ gift: formHelper.setTagetPropertyValueByEvent(gift, e) });
    }

    renderChildByGiftType = ({ errors }) => {
        const { gift } = this.state;
        const giftType = gift.giftType;
        return <div>
            <GridRow>
                {(giftType === 1 || giftType === 7) && <div style={{ marginTop: -10, width: 220, display: 'flex', justifyContent: 'left', alignItems: 'center', paddingLeft: 20 }}>
                    <GridSwitch name="useAfterSend" value={gift ? gift.useAfterSend : false} label="发券后是否立即使用" onChange={this.onPropertyChange} />
                </div>}
                {(giftType !== 7) && <GridTextField name="giftValue" label="卡券面值" value={gift.giftValue} errors={errors} onChange={this.onPropertyChange} />}
                {(giftType !== 7) && <GridTextField name="point" label="兑换积分" value={gift.point} errors={errors} onChange={this.onPropertyChange} />}
                {(giftType === 7) && <GridTextField name="giftValMin" label="卡券最小面值" value={gift.giftValMin} errors={errors} onChange={this.onPropertyChange} />}
                {(giftType === 7) && <GridTextField name="giftValMax" label="卡券最大面值" value={gift.giftValMax} errors={errors} onChange={this.onPropertyChange} />}
            </GridRow>
            {(giftType === 9 || giftType === 10 || giftType === 11) && <GridRow style={{ marginTop: 30 }}>
                <div style={{ marginTop: -10, width: 220, display: 'flex', justifyContent: 'left', alignItems: 'center', paddingLeft: 20 }}>
                    <GridSwitch name="isSupService" value={gift ? gift.isSupService : false} label="是否外部供应商提供的活动商品服务" onChange={this.onPropertyChange} />
                </div>
                <GridTextField name="iconUrl" label="图标链接地址" value={gift.iconUrl} errors={errors} onChange={this.onPropertyChange} />
                <div style={{ marginTop: -10, width: 220, display: 'flex', justifyContent: 'left', alignItems: 'center', paddingLeft: 20 }}>
                    <GridSwitch name="isHomePageDisplay" value={gift ? gift.isHomePageDisplay : false} label="是否财富商城首页展示" onChange={this.onPropertyChange} />
                </div>
                <GridTextField name="supServiceName" label="外部供应商名称" value={gift.supServiceName} errors={errors} onChange={this.onPropertyChange} />
                <GridTextField name="supServiceSku" style={{ width: 250 }} label="外部供应商提供的活动商品编码" value={gift.supServiceSku} errors={errors} onChange={this.onPropertyChange} />
            </GridRow>}
        </div>
    }

    render() {
        const { gift, giftTypes, onCommit, payTypes, supportTypes, companys } = this.state;
        return < Formik
            initialValues={gift}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={values => onCommit(formHelper.revertDateFormat( values,['beginTime','endTime','expireTime']))}
            render={({ errors, }) => (
                <Form >
                    <div style={{ padding: 10 }}>
                        <GridRow style={{ marginBottom: 15 }}>
                            <GridTextField name="name" label="卡券名称" style={fieldStyles.firstColumn} value={gift.name} errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="giftTag" value={gift.giftTag} label="卡券标签" errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="shotDesc" value={gift.shotDesc} label="卡券简述" errors={errors} onChange={this.onPropertyChange} />
                            <GridTextAreaField name="description" style={{ marginRight: 15 }} value={gift.description} label="卡券描述" errors={errors} onChange={this.onPropertyChange} />
                        </GridRow>
                        <GridRow>
                            <GridSelectField name="giftType" style={{ width: 200 }} value={gift.giftType} errors={errors} label={'卡券类型'} onChange={this.onPropertyChange}>
                                {giftTypes && giftTypes.map(x => <MenuItem key={x.value} value={x.value}>{x.name}</MenuItem>)}
                            </GridSelectField>
                            <GridSelectField style={{ width: 200 }} name="payTypeLimit" value={gift.payTypeLimit} errors={errors} label={'卡券使用支付类型'} shrink={true} onChange={this.onPropertyChange}>
                                {payTypes.map(x => <MenuItem key={x.value} value={x.value}>{x.name}</MenuItem>)}
                            </GridSelectField>
                            <GridTextField name="amountLimit" label="卡券使用交易金额" value={gift.amountLimit} errors={errors} onChange={this.onPropertyChange} />
                        </GridRow>
                        {this.renderChildByGiftType({ errors })}
                        <GridRow style={{ marginTop: 20 }}>
                            <GridSelectField style={{ width: 200 }} name="supportType" value={gift.supportType} errors={errors} label={'发券方式'} shrink={true} onChange={this.onPropertyChange}>
                                {supportTypes.map(x => <MenuItem key={x.value} value={x.value}>{x.name}</MenuItem>)}
                            </GridSelectField>
                            <GridSelectField style={{ width: 200 }} name="companyId" value={gift.companyId} errors={errors} label={'发券平台'} shrink={true} onChange={this.onPropertyChange}>
                                {companys.map(x => <MenuItem key={x.value} value={x.value}>{x.name}</MenuItem>)}
                            </GridSelectField>
                            <GridTextField name="giftReference" label="卡券来源" value={gift.giftReference} errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="activeName" label="活动名称" value={gift.activeName} errors={errors} onChange={this.onPropertyChange} />
                        </GridRow>
                        <GridRow style={{ marginTop: 20 }}>
                            <GridTextField name="dayTimes" label="单用户单日可兑换" value={gift.dayTimes} errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="totalTimes" label="单用户累计可兑换" value={gift.totalTimes} errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="dayLimit" label="每日总共可兑换" value={gift.dayLimit} errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="totalLimit" label="用户总共可兑换" value={gift.totalLimit} errors={errors} onChange={this.onPropertyChange} />
                        </GridRow>
                        <GridRow style={{ marginTop: 20 }}>
                            <GridTextField name="dayTimes" label="有效天数" value={gift.dayTimes} errors={errors} onChange={this.onPropertyChange} />
                            <GridDateTimePickerField name="expireTime" onChange={this.onPropertyChange} label="有效截止日期" value={gift.expireTime} />
                            <GridDateTimePickerField name="beginTime" onChange={this.onPropertyChange} label="可领取开始时间" value={gift.beginTime} />
                            <GridDateTimePickerField name="endTime" onChange={this.onPropertyChange} label="可领取结束时间" value={gift.endTime} />
                        </GridRow>
                        <GridRow style={{ marginTop: 20 }}>
                            <GridTextField name="appLimit" label="使用范围" value={gift.appLimit} errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="remark" label="使用说明" value={gift.remark} errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="consumeUrl" label="卡券使用跳转地址" value={gift.consumeUrl} errors={errors} onChange={this.onPropertyChange} />
                            <GridTextField name="ruleUrl" label="卡券规则跳转地址" value={gift.ruleUrl} errors={errors} onChange={this.onPropertyChange} />
                        </GridRow>
                    </div>
                    <hr style={{ border: 'none', borderBottom: 'solid 1px lightgray', marginLeft: -15, marginRight: -15, marginTop: 10 }} />
                    <Button variant="contained" color="primary" style={{ marginTop: 5 }} type="commit">保存</Button>
                </Form>
            )}
        />
    }
}

 