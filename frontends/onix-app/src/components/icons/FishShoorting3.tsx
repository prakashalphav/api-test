type Props ={
    id? : string;  // this id needed if one page reuse same icon (id cannot duplicate)
}
export const FishShootingIcon= (props : Props)=>(
<svg width="1em" height="1em" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<mask id={`mask0${props.id}`}  style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22">
<rect width="22" height="22" fill={`url(#pattern0${props.id})`}/>
</mask>
<g mask={`url(#mask0${props.id})`} >
<rect x="1.11523" width="20.3077" height="22" fill={`url(#paint0_linear${props.id})`} />
</g>
<defs>
<pattern id={`pattern0${props.id}`}  patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_85_4863" transform="scale(0.0104167)"/>
</pattern>
<linearGradient id={`paint0_linear${props.id}`} x1="1.11523" y1="11" x2="21.4229" y2="11" gradientUnits="userSpaceOnUse">
<stop stop-color="currentColor"/>
<stop offset="0.484375" stop-color="currentColor"/>
<stop offset="1" stop-color="currentColor"/>
</linearGradient>
<image id="image0_85_4863" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAIuElEQVR4nO2cfVAU5xnAN21qJplOZ2pugVNjdBdEDpDIAffBHcfX8R1t/7BpWs00Gg9RowFMQSCSNqYT2pIAKsjdSc1HO42dFmeX2GmaVPOHsU3URO80aYyJd0bgbj/ugmmjgjydPcRSuDp3sMeyt/ubeWYYdmbneZ/f7vu+++67hyAyMjIyMjIyMjIigkCxG4QCHyBR7BihwBsP378kUeicJAWJ4jA5CAX2dwLFDELnJlkBJCcBxUdJFP/tkfnx3xE6R0kKIG/fDbij97v4A0LnKVkBZCAw9+H7ExcInauEBeBAKrAThxDVPKHzla4ANNAdtQidr6QFkCh2vTf2wSVC5yxhATg3O+oWOmdpC1Bg1w6hqm8LnXfUQN4qbF8MDscWquD9JWlwPkENnyVp4HKyDvpVevCk6OFKkg7ciVlwMSEDPk/IeGswUVN7ZZnGAGr1t4Rug2gB1Zp5xxenwvnETOhPM4L3oRzwpnFhBM8KA3hSDeBJyQ4IGEzWw6BKNxZJWhhcroGBRA14f7Dha6Zp90Vqc+1usFjuE7pNomAgy7zUm573AqXO9VDpueBdyYVpWgKodZXgt78SCF9b1whT0/Q2Zdm6XOg2zkm8mQXLvBn5L3vV+cOUOg8CwaOA2yK67KP0jqbjgz96ChO6zXMCSl+4gMoqPEhl5o9QmQVAZeRDJAWMB7vXOkpVN74OFos0xwkoKbmH1pp30lnmq3RWIdBZBTCbAm6LeL51yLuuyoRICTq7UMtozedorRlojRmEFBDoljrto9Smmh4k2nFr19zL6IpfpHXmm4y2COaKgPFgdv3iElNVE52rq5SuaDmtK/mQ0RcDoyuCuSggIKGl4xqzfosOiSbo7JINTHbxvxl9Ccx1AYFxob1rxGvZ/sisFumPsVgMqcD2EQrsUxLFfYQC+4pE8fdIFG8nFUuNzQjyjXDPCSbT3ayx9AXWUApMNld8cQgYHxdoS20TMhscmR+/aOzl9x3XWj4iUfyxo4jp7lDOOWSqUDDG0qOssQzEKCAgofs3QFtqmiMugEDx18JY9j3dp8DVdzofm1OayuSUfRYovlG8AgLR1QOeJ56si6gAUoFRYa48jvShWB0gyF1Ti1/xMGssu8rmlENUCLCPSaAsNVURFID/K9yl31t3w+8nvgpkTRXr2JyK4UDxo0mAfezJ2fv49tKICCBQ7Pz0BATex/Zy4wKbW7GFNZXf9JkqIBoF+DkJv+q43r9+84OREGCdtgAUh3Mrsk/5ch8GrvhiENCcmwkNxnS43NEZiAbDStiVlxXac8Kzv6RhTTO/GwD6YhM00y2+MzUbAsUXkYAGw0pYG49CrSY5ENzfnJBQ7wS6pvEYwjcEih0Nt/iOFD348laJTsAXHV2wQ5sSKDwX1ZlJ4G7bF3p3ZD0I3o3b1/MqgIzFUggUGw61+GdT9ODPXxUVAmoyksDVvjfs8eDKoxYFrxIIFHs6lOKfSdaCP3+1aAU0zLALGg+K766Im9eTKPb6nYr//vJM8BesFrWAXXlZ0GhU/3cQNqZDc64m/JlRVw/0b6zK5FUCN68nUZwMVvzj8Q+Bjyu8yAX4eQzm6ebTCN8ciY+/h1Bgf5gswGsqB3/B92QB9gljQfv+m7MmwJMjC/BPvgP4FsAV//92QTjXBcl3gH/iM8FPd33A6yAc7MqfGO8ty5C7IPtY8X37e8Dz+Gb+PpciUKw+lGnoByqNPAjbuWlo0zu8Ff+NGCw1nAexM8k6Sc+C2Na9N3h9ECNQ7J1wlyLOpuikKcB6EJgnqjfyV/wYXDfdxTgHJ0FiApjqhrd5Kz4fy9EfpYlrOdo/k+L/rIXhfTmaRPGPZ/pChjFVbJLCC5mBtVuX8lp8Pl9J+nLKv8/mVFyLRgHsHuvo4IZtZiQSEArMG07hudkSt3Ia7KU8YyorYXPKhqJJgK/zAHgqt22OSPFvCXg19OLjJw8r4lfe6XxeQ+kyNqf846gQ0MXtiKiuRYTfmIWd64uJX3sIQb4Zyjn92qL5rLH0r2LfmEVV1j6LzNbWREKB7SFQ/BMCxVlurxCB4v8gUPwl7tdJprs1kTGWtot2a2LV9p1INOAzFv+E0Zd8JRYBvrbOEe+m6h8i0QSlL06k9cWn57oAtqXt6wGLRYNE7WdJuqIWWmsemYsC6IbnLg5u2BaLRDtsdlEaozGfmisCfPtso/TWHV2I1D7Ert9mg8+NqwQVwDzf+iVT+VQ2IkWUNjekdDih+7HnYFBTNKsC2D3Wm1TtM7/jZmqIVFHa3DAema2ngMrMP+DNyL8R0Q+199pGmR3PHKUrqxciUkc5QQAX3P9YdeFiKj1vN6XO6+dTAPti5zBd0/hGRHY3R5OAcbhfOvlxQy/YH22CT3QV0xPwyPqrTMPP/0lX1e6UdFczHQETjy+yXoLi3X8DT5pxiyfNYPesMJzwpBouXlAXwWBqNlxIN8Mp3WoYUGlPDCRprQOJ2icHErRZgKwJadlEsihDFDDd4zKygLmNctIVvNB6edHtY91XFod7XLCGiBXlpAIqba4jC3q+eCBQXKvrz+EeF7o9okM5pcAzC6HbIzqUsgBZgKRRyneAwAKsriHeJFjdXwrcHPGhtLrP8SfA5RC6PaIjzuZ+iUcBvxa6PaIj1u5OUVpdIzwUfyTuwCWV0O0RJXFW156ZCoizuduEbodoUR1yzouzut+advGt7jeR7pPS/PFVXiXYXB3hdUeu4cCVLxefP+IOXFIpbe5WbkYT1+26PuVq73ZfU9pcZ7kBV+7zI02doxWpd8L/hkOe6cwa9Y79UwTUOaW1d0dQ6hyvTb0DnK8KnZZ0qHP0BhHwJ6HTkg71zjeDdEF/ETot6VDnfDfIHXBc6LSkQ53zTBABHwqdlnSod346tQtyXBA6LelQ7xgIIqBf6LSkQ53japAHsSGh05IIcBdS7xwJMgaMCJ2ZNGg+eV+Q4o9F9bv3Cp2ejIyMjIwMEiL/AebwlpNNbJklAAAAAElFTkSuQmCC"/>
</defs>
</svg>
);