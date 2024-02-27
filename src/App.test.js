import { render, screen,fireEvent, waitFor } from '@testing-library/react';
import DataTable from './components/DataTable';
import React, { useContext } from 'react';
import { AuthContext } from './config/Authentications/AuthContext';
import { useParams } from 'react-router-dom';

jest.mock('./service/DataContex', () => ({
  useData: jest.fn(() => ({
    data: {
      menu_data: [
        {
          menuid: 13,
          menu_name: "Home",
          menu_link: "#/home/",
          menu_slug: "home"
        }
      ]
    }
  })),
}));


// // Mock the context data
// jest.mock('./components/DataTable', () => ({
//   selecet_Rows: {
//     Consumer: (props) => props.children({ message1: 'Mocked message1' }),
//   },
//   UpdateDetails: {
//     Consumer: (props) => props.children({ message2: 'Mocked message2' }),
//   },
//   UpdateCustList: {
//     Consumer: (props) => props.children({ message3: 'Mocked message3' }),
//   },
// }));

// test('renders message from parent', () => {
//   const { getByText } = render(<ActionDropdown/>);
//   const messageElement = getByText(/List/i);
//   expect(messageElement).toBeInTheDocument();
//   expect(messageElement.textContent).toBe('Message from Parent: Mocked message');
// });


jest.mock('./components/DataTable', () => ({
  __esModule: true,
  default: jest.fn(),
  selecet_Rows: { Provider: ({ children }) => children },
}));


jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')
  return {
    ...ActualReact,
    useContext: () => ({smShowError: false ,authState: {}}),
  }
})

// const mockContextValue1 = {
//   selectedFlatRows: [{id:"1"}],
// };

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useParams: jest.fn(),
//   useLocation: jest.fn(() => ({ search: '?customer' })),
// }));

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useParams: jest.fn().mockReturnValue({ pvid: 'mockedPvid' }),
//   //  useLocation: jest.fn(() => ({ search: "xyz" })),
//   //  useLocation: () => ({
//   //  search: "xyz"
//   // })
// }));



// Mock the AuthContext, useParams, and useLocation values


jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
}));
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useParams: jest.fn().mockReturnValue({ pvid: 'mockedPvid' }),
// }));

const mockAuthContext = {
  authState: { tenant_cname: 'mocked_cname' },
};

// const locationMock = jest.fn();
// const mockUseLocation = ()=>{
//   jest.mock('react-router-dom', () => ({
//     useLocation : ()=> locationMock()
// })
//   )
// }

//     it("test", ()=>{
//       locationMock.mockReturnValue({
//         pathanme: "/val"
//       })
//       expect()
//     })


//  jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useLocation :() =>({
//       pathname: mockPath,
//     })
//   })
//     )

//     test("first",()=>{
//       mockPath="val2"
//     })
           


// describe('DataTable component Loction search', () => {
//   jest.mock('react-router-dom', () => ({
//     useLocation: jest.fn().mockReturnValue({
//       pathname: '/another-route',
//       search: 'xyz',
//       hash: '',
//       state: null,
//       key: '5nvxpbdafa',
//     }),
//   }));
// })

function mockFunction() {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useLocation: jest.fn().mockReturnValue({
      pathname: '/another-route',
      search: 'ddddd',
      hash: '',
      state: null,
      key: '5nvxpbdafa',
    }),
  };
}

jest.mock('react-router-dom', () => mockFunction());




test('search functionality works as expected', async () => {
  // Mock useParams to return an id
  useParams.mockReturnValue({ id: '1' });

  // Render DataTable with mocked AuthContext
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <DataTable />
    </AuthContext.Provider>
  );

// //  Assert that DataTable is rendered successfully
//  expect(screen.getByTestId('data-table')).toBeInTheDocument();


//   //  search input element
//  const searchInput = screen.getByRole('textbox', { name: '' });
 
//   // Enter a search query
//   fireEvent.change(searchInput, { target: { value: 'Your Search Query' } });
//   console.log("====================", fireEvent);
//   // Find and click the search button
//   const searchButton = screen.getByRole('button');
//   fireEvent.click(searchButton);

});

//  test('renders learn react link', () => {
//   jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
//   render(
//     <AuthContext.Provider value={mockAuthContext}>
//           {/* <selecet_Rows.Provider value={mockContextValue1}> */}
//     <DataTable />
//     {/* </selecet_Rows.Provider> */}
//   </AuthContext.Provider>

//   //   <AuthContext.Provider value={{ authState: { tenant_cname: 'mocked_cname' } }}>
//   //         <DataTable />    
//   // </AuthContext.Provider>
//   );  console.log("====================", screen.getByText(/search/i));
//   // const linkElement = screen.getByText(/search/i);
//   // expect(linkElement).toBeInTheDocument();
// });




// describe('MoreDropDown Component', () => {
// test('renders MoreDropDown component', async () => {
//   const { getByText, getByTestId } = render(<MoreDropDown />);
  
//   // Make sure the component renders properly
//   expect(getByText('More')).toBeInTheDocument();

//   // Simulate a click on the dropdown toggle
//   fireEvent.click(getByTestId('dropdownMoreButton'));

//   // Wait for the dropdown menu to appear
//   await waitFor(() => {
//       expect(getByText('Test Button')).toBeInTheDocument();
//       expect(getByText('Test2 Button')).toBeInTheDocument();
//   });
// });
// });
