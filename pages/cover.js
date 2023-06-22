import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import allWhite from '../images/white.jpeg'
import allRed from '../images/red.jpeg'
import cream from '../images/cream.jpeg'
import green from '../images/green.jpeg'
import redWhite from '../images/redwhite.jpeg'
import redWhiteSpine from '../images/redwhitespine.jpeg'
import whiteCream from '../images/whitecream.jpeg'
import whiteRedSpine from '../images/whiteredspine.jpeg'
import allWhiteOpen from '../images/whitewhite.jpeg'
import Image from 'next/image'
import jwt_decode from 'jwt-decode';





const product = {
  name: 'Choose your Bundle book style',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Book', href: '#' }
  ],
  images: [
    {
      src: allWhite,
      alt: 'All white book',
    },
    {
      src: allRed,
      alt: 'Red book',
    },
    {
      src: cream,
      alt: 'Cream book',
    },
    {
      src: green,
      alt: 'Green book',
    },
    {
        src: redWhite,
        alt: 'Red and white book',
      },
      {
        src: redWhiteSpine,
        alt: 'Red book white spine book',
      },
      {
        src: whiteCream,
        alt: 'White cream book',
      },
      {
        src: whiteRedSpine,
        alt: 'Red book white spine book',
      },
      {
        src: allWhiteOpen,
        alt: 'All white book open',
      },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'Classic White', inStock: true, code: 'classic-white' },
    { name: 'Red/ White spine', inStock: true, code: 'red-white-spine' },
    { name: 'White/ Red spine', inStock: true, code: 'white-red-spine' },
    { name: 'White/ Cream spine', inStock: true, code: 'white-cream-spine' },
    { name: 'All Red', inStock: true, code: 'all-red' },
    { name: 'All Cream', inStock: true, code: 'all-cream' },
    { name: 'Red Back', inStock: true, code: 'red-back'},
    { name: 'Green back', inStock: true, code: 'green-back'},
  ],
  description: 'Choose the style of your recipient\'s book.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ChooseBook() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const [chooseStyle, setChooseStyle] = useState(null);
  const [userID, setUserID] = useState(null);

  //useEffect for getting userID from local storage
  useEffect(() => {
    const decodedToken = jwt_decode(token);
    const userID = decodedToken.userId; 
    setUserID(userID);
    console.log('userID conver', userID);
  }, []);


  const handleChosenStyle = (e) => {
    e.preventDefault();
  
    // Make a PUT request to your backend server
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chooseStyle })
    };
    fetch(`https://yay-api.herokuapp.com/book/${userID}/updateBook`, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  return (
    <div className="bg-white">
    <div className="pt-6">
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          className="mx-auto flex flex-wrap max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          {product.breadcrumbs.map((breadcrumb) => (
            <li key={breadcrumb.id} className="flex items-center space-x-2">
              <a
                href={breadcrumb.href}
                className="mr-2 text-sm font-medium text-gray-900"
              >
                {breadcrumb.name}
              </a>
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-4 w-3 text-gray-300 lg:h-5 lg:w-4"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </li>
          ))}
          <li className="text-sm">
            <a
              href={product.href}
              aria-current="page"
              className="font-medium text-gray-500 hover:text-gray-600"
            >
              {product.name}
            </a>
          </li>
        </ol>
      </nav>
  
      {/* Image gallery */}
      <div className="mx-auto mt-6 max-w-2xl px-4 sm:px-0">
        <Image
          src={(() => {
                switch(chooseStyle) { // chosen style of book
                  case null:
                    return allWhite;
                  case 'classic-white':
                    return allWhite;
                  case 'red-white-spine':
                    return redWhiteSpine;
                  case 'white-red-spine':
                    return whiteRedSpine;
                  case 'white-cream-spine':
                    return whiteCream;
                  case 'all-red':
                    return allRed;
                  case 'all-cream':
                    return cream;
                  case 'red-back':
                    return redWhite;
                  case 'green-back':
                    return green;
                  default:
                    return allWhite;
                }
              })()}
              height={100}
              width={400}
              alt="Book style image"
              className="w-full h-auto object-cover object-center"
            />
          </div>
      
          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
                {product.name}
              </h1>
            </div>
      
            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
            {/* <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{product.price}</p> */}

            {/* Reviews */}
            {/* <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div> */}

            <form className="mt-10">
              {/* Colors
              <div>
                <h3 className="text-sm font-medium text-gray-900">Style</h3>

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                  <RadioGroup.Label className="sr-only"> Choose a book style </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {' '}
                          {color.name}{' '}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            'h-8 w-8 border border-black border-opacity-10 rounded-full'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div> */}

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Style</h3>
            
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only"> Choose a style </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                              : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span" onClick={() => {
                                setChooseStyle(size.code)
                                
                                console.log('value', value);
                            }} value={size.name}>{size.name}</RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                onClick={handleChosenStyle}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 py-3 px-8 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Select             
                </button>
            </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-sm text-gray-900 sm:text-base">
                    {product.description}
                  </p>
                </div>
              </div>

            {/* <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}

            <div className="mt-10">
              {/* <h2 className="text-sm font-medium text-gray-900">Details</h2> */}

              {/* <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
