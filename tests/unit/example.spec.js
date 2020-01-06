import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import PostcodesNearby from '@/components/PostcodesNearby.vue'
import SearchQuery from '@/components/SearchQuery.vue'
import SearchQueryResult from '../../src/components/SearchQueryResult.vue'
import App from '../../src/App.vue'

describe('PostcodesNearby.vue', () => {
    it('renders props.postcodes when passed', () => {
        const postcodes = ["E11DA", "E11NY"]
        const wrapper = shallowMount(PostcodesNearby, {
            propsData: { postcodes }
        })
        postcodes.map(el => {
            expect(wrapper.text()).to.include(el)
        })
    })
})

describe('PostcodesNearby.vue', () => {
    it('renders span for each item in props.postcodes', () => {
        const postcodes = ['E11YX', 'E1WDD']
        const wrapper = shallowMount(PostcodesNearby, {
            propsData: { postcodes }
        })
        expect(wrapper.findAll('span')).to.have.lengthOf(postcodes.length)
    })
})

describe('SearchQuery.vue', () => {
    it('check searchPostcode method', () => {
        const wrapper = shallowMount(SearchQuery);
        const appWrapper = shallowMount(App)
        // const resultWrapper = shallowMount(SearchQueryResult)
        expect(wrapper.vm.searchInput).to.be.null;
        // wrapper.find("[data-search-input]").setValue("E1 7AA")
        // wrapper.find("form").trigger("submit")
        // expect(appWrapper.vm.nhs_da).toBe("London")
        // expect(resultWrapper.props.town).to.equal("London")
    })
})
