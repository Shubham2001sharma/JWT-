/* eslint-disable no-unused-vars */
import React from 'react'

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-purple-200 to-indigo-500 text-gray-900 py-8">
    <div className="container mx-auto flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
        <p>123 Street Name, City, Country</p>
        <p>Email: info@example.com</p>
        <p>Phone: +1234567890</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
        <ul>
          <li>About Us</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
    </div>
  </footer>
  )
}

export default Footer