<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PortfolioPageTest extends TestCase
{
    /**
     * Test that the portfolio page loads correctly.
     */
    public function test_portfolio_page_loads_successfully(): void
    {
        $response = $this->get('/portfolio');

        $response->assertStatus(200);
    }
}
