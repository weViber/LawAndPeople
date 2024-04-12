const SelectCategory = ({ handleInput })=>{
    return(
        <select onChange={ handleInput } name="category">
            <option value="손해배상">손해배상</option>
            <option value="사기/공갈">사기/공갈</option>
            <option value="산재">산재</option>
            <option value="성폭력/강제추행">성폭력/강제추행</option>
            <option value="부동산/임대차">부동산/임대차</option>
            <option value="이혼">이혼</option>
            <option value="금전/계약문제">금전/계약문제</option>
            <option value="기타 민사">기타 민사</option>
            <option value="기타 형사">기타 형사</option>
            <option value="교통사고">교통사고</option>
            <option value="명예훼손 모욕">명예훼손 모욕</option>
            <option value="의료/지식재산/금융">의료/지식재산/금융</option>
            <option value="폭행/협박/상해일반">폭행/협박/상해일반</option>
            <option value="행정">행정</option>
        </select>
    )
}
export default SelectCategory