class TypeTest {
    isNumberArray(data: any): data is number[] {
        if (!Array.isArray(data)) {
            return false // 不是数组，直接返回 false
        }

        // 检查数组中的每个元素是否都是数字
        for (const item of data) {
            if (typeof item !== 'number') {
                return false // 数组中有非数字元素，返回 false
            }
        }

        return true // 数组中的所有元素都是数字，返回 true
    }
}

export default new TypeTest()
